import SnakeGame from "@/components/Game/SnakeGame";

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black">
      <SnakeGame />
    </main>
  );
}
