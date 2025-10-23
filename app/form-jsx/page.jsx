'use client'; // <-- Wajib untuk menggunakan hooks seperti useState

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // <-- Untuk pindah halaman

export default function FormRegistrasi() {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk menyimpan pesan error validasi
  const [errors, setErrors] = useState({});

  const router = useRouter(); // Inisialisasi router

  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah form refresh halaman

    let newErrors = {};

    // 1. Validasi Nama
    if (!nama) {
      newErrors.nama = 'Nama wajib diisi.';
    } else if (/\d/.test(nama)) {
      // Cek apakah ada angka
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

    if (Object.keys(newErrors).length === 0) {
      console.log('Data valid:', { nama, email, password });
      router.push(
        `/hasil?nama=${encodeURIComponent(nama)}&email=${encodeURIComponent(
          email
        )}&password=${encodeURIComponent(password)}`
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Form Registrasi (JSX)
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
            onChange={(e) => setNama(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-gray-900 ${
              errors.nama ? 'border-red-500' : 'border-gray-700'
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
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-gray-900 ${
              errors.email ? 'border-red-500' : 'border-gray-700'
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
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg text-gray-900 ${
              errors.password ? 'border-red-500' : 'border-gray-700'
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