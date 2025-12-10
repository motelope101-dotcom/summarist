// app/page.tsx
import FeaturedBook from "@/components/FeaturedBook";
import TopPicksGrid from "@/components/TopPicksGrid";
import ContinueListening from "@/components/ContinueListening";

export default function HomePage() {
  return (
    <main>
      <FeaturedBook />
      <TopPicksGrid />
      <ContinueListening />
    </main>
  );
}