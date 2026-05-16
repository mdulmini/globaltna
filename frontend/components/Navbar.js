import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-700 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-white text-xl font-bold tracking-tight hover:opacity-90 transition">
          🔧 GlobalTNA
        </Link>
        <Link
          href="/new"
          className="bg-white text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition shadow-sm"
        >
          + Post a Request
        </Link>
      </div>
    </nav>
  );
}