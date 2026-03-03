import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 text-sm">
      <Link href="/farmer/dashboard">🏠 Home</Link>
      <Link href="/farmer/trends">📊 Trends</Link>
      <Link href="/farmer/addReport">➕ Add</Link>
      <Link href="/farmer/myReports">📄 Reports</Link>
      <Link href="/farmer/suggestions">🌱 Tips</Link>
      <Link href="/farmer/profile">🌱 Tips</Link>

    </div>
  );
}
