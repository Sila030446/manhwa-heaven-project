import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  return (
    <section className="container mx-auto px-4 py-2">
      <div className="grid-cols-1">
        <HeroCarousel />
        <div className="bg-red-500">Hello</div>
      </div>
    </section>
  );
}
