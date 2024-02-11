import Image from "next/image";
import GradientPage from "@/components/gradient";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GradientPage />
    </main>
  );
}
