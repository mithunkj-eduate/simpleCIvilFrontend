import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      <h1 className="text-6xl font-bold mb-4 text-violet-500">404</h1>

      <h2 className="text-2xl font-semibold mb-2">Portfolio Not Available</h2>

      <p className="text-gray-400 text-center max-w-md mb-6">
        This portfolio is either unpublished or does not exist.
      </p>

      <Link
        href="/?v=2"
        className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg transition"
      >
        Go Home
      </Link>
    </div>
  );
}
