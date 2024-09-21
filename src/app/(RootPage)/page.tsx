import HeroCarousel from "../components/HeroCarousel";
import MangaUpdated from "../components/MangaUpdated";

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-2 font-Kanit">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-3 mb-2">
          <HeroCarousel />
        </div>
        <div className="col-span-2">
          <MangaUpdated />
        </div>
      </div>
    </section>
  );
}
