'use client';

// Impor 'type' untuk event React
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react'; 

// --- LANGKAH 1: Definisikan "bentuk" atau "tipe" data ---

interface FormErrors {
  nama?: string;
  email?: string;
  password?: string;
}

export default function FormRegistrasi() {
  // --- LANGKAH 2: Beri tahu useState tipe datanya ---
  const [nama, setNama] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

const [errors, setErrors] = useState<FormErrors>({});


  // --- LANGKAH 3: Beri tahu fungsi tipe data parameternya ---
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 

    let newErrors: FormErrors = {};

    // --- Logika Validasi ---
    // 1. Validasi Nama
    if (!nama) {
      newErrors.nama = 'Nama wajib diisi.';
    } else if (/\d/.test(nama)) {
      newErrors.nama = 'Nama tidak boleh mengandung angka.';
    }

    // 2. Validasi Email
    if (!email) {
      newErrors.email = 'Email wajib diisi.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Alamat email harus valid (mengandung @).';
    }

    // 3. Validasi Password
    if (!password) {
      newErrors.password = 'Password wajib diisi.';
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}/.test(password)
    ) {
      newErrors.password =
        'Password harus min 8 karakter, kombinasi huruf besar, kecil, angka, dan simbol.';
    }

    setErrors(newErrors);

    // --- Logika Submit ---
    if (Object.keys(newErrors).length === 0) {
      console.log('Data valid:', { nama, email, password });
      
      // Ini akan memperbaiki error kompilasi dan tetap mengirim data ke halaman hasil
      window.location.href = 
        `/hasil?nama=${encodeURIComponent(nama)}&email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`;
      
    }
  };

  // --- Tampilan (View) ---
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Form Registrasi (TSX)
        </h1>

        {/* Input Nama Lengkap */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nama">
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama"
            placeholder="Masukkan nama lengkap"
            value={nama}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNama(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.nama ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.nama && (
            <p className="text-red-500 text-sm mt-1">{errors.nama}</p>
          )}
        </div>

        {/* Input Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Masukkan email aktif"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Input Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
        >
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}

