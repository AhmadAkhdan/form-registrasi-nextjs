export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">
          Tugas Form Registrasi
        </h1>
        <div className="space-y-4">
          {/* Ganti komponen <Link> dengan tag <a> standar */}
          <a
            href="/form-jsx"
            className="block w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Buka Versi .JSX
          </a>
          {/* Ganti komponen <Link> dengan tag <a> standar */}
          <a
            href="/form-tsx"
            className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Buka Versi .TSX
          </a>
        </div>
      </div>
    </main>
  );
}