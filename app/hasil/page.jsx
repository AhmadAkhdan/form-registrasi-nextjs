// app/hasil/page.jsx
'use client';

import { Suspense } from 'react'; // Diperlukan untuk useSearchParams
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link'; // Untuk tombol kembali

// Komponen utama harus dibungkus Suspense di level layout atau page
// Tapi untuk App Router, kita bisa buat komponen terpisah seperti ini
function HasilContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State untuk menyimpan data (bisa di-edit)
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk mode edit [cite: 95]
  const [isEditing, setIsEditing] = useState(false);

  // Ambil data dari URL saat komponen dimuat
  useEffect(() => {
    setNama(searchParams.get('nama') || '');
    setEmail(searchParams.get('email') || '');
    setPassword(searchParams.get('password') || '');
  }, [searchParams]);

  // Handler untuk tombol "Simpan Perubahan"
  const handleSave = () => {
    setIsEditing(false);
    router.push(
      `/hasil?nama=${encodeURIComponent(nama)}&email=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(password)}`,
      { scroll: false }
    );
  };

  // Handler untuk tombol "Batal"
  const handleCancel = () => {
    // Kembalikan data ke state awal (sebelum diedit)
    setNama(searchParams.get('nama') || '');
    setEmail(searchParams.get('email') || '');
    setPassword(searchParams.get('password') || '');
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Hasil Registrasi
        </h1>

        {/* Tampilan kondisional: Tampil/Edit [cite: 96] */}
        {!isEditing ? (
          // --- TAMPILAN HASIL (No. 4) ---
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm">Nama Lengkap</label>
              <p className="font-semibold text-gray-700 text-lg">{nama}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Email</label>
              <p className="font-semibold text-gray-700 text-lg">{email}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm">Password</label>
              <p className="font-semibold text-gray-700 text-lg">{password}</p>
            </div>
            
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Edit Data
            </button>
          <Link 
            href="./page.tsx" 
            className="block w-full text-center bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 mt-2"
          >
            Kembali ke Form Awal
          </Link>
          </div>
        ) : (
          // --- TAMPILAN EDIT (No. 5) ---
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="edit-nama">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="edit-nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="edit-email">
                Email 
              </label>
              <input
                type="email"
                id="edit-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="edit-password">
                Password
              </label>
              <input
                type="password"
                id="edit-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg border-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 mt-2"
            >
              Batal
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Bungkus komponen dengan Suspense untuk useSearchParams
export default function HasilPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HasilContent />
    </Suspense>
  );
}