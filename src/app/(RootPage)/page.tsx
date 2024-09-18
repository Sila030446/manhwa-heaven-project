import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-2">
      <div className="gird grid-cols-1">
        <HeroCarousel />
      </div>
    </section>
  );
}
