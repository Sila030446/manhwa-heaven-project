"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Image, Button, Progress } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

async function fetchPages(slug: string) {
  try {
    const response = await fetch(`http://localhost:8000/manga/chapter/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    return null;
  }
}

const ChapterPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter(); // Use router for navigation
  const [chapter, setChapter] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const loadPages = async () => {
      const data = await fetchPages(params.slug);
      setChapter(data);
      setLoading(false);
    };
    loadPages();
  }, [params.slug]);

  // Function to handle scroll and update progress value
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPosition / pageHeight) * 100;
    setScrollProgress(scrollPercent);
  };

  // Add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigate to previous chapter
  const goToPreviousChapter = () => {
    if (chapter?.prevChapterSlug) {
      router.push(`/chapter/${chapter.prevChapterSlug}`);
    }
  };

  // Navigate to next chapter
  const goToNextChapter = () => {
    if (chapter?.nextChapterSlug) {
      router.push(`/chapter/${chapter.nextChapterSlug}`);
    }
  };

  if (loading) {
    return <div className="text-center my-10">Loading pages...</div>;
  }

  if (!chapter || !chapter.pages) {
    return (
      <div className="text-center my-10">No pages found {params.slug}</div>
    );
  }

  return (
    <>
      <section className="content">
        <div className="flex flex-col items-center gap-1">
          {/* Back to Top button */}
          <div className="fixed bottom-11 right-1 z-50">
            <Button
              radius="full"
              isIconOnly
              className="bg-gray-500/50 backdrop-blur-none"
              onClick={scrollToTop}
            >
              <ChevronUp />
            </Button>
          </div>

          {/* Progress bar showing scroll progress */}
          <div className="w-[100%] z-50 fixed bottom-0 flex justify-between items-center gap-1 px-1 py-1 bg-gray-500/50">
            {/* Previous Chapter Button */}
            <Button
              size="sm"
              isIconOnly
              disabled={!chapter.prevChapterSlug}
              onClick={goToPreviousChapter}
            >
              <ChevronLeft />
            </Button>

            <Progress
              color="secondary"
              aria-label="Scroll Progress"
              value={scrollProgress}
            />

            {/* Next Chapter Button */}
            <Button
              size="sm"
              isIconOnly
              disabled={!chapter.nextChapterSlug}
              onClick={goToNextChapter}
            >
              <ChevronRight />
            </Button>
          </div>

          <h1>{chapter.title}</h1>

          <div>
            {chapter.pages.map((page: any) => (
              <Image
                radius="none"
                loading="lazy"
                key={page.id}
                src={page.imageUrl}
                alt={`Page ${page.pageNumber}`}
                width="100%"
                height="100%"
              />
            ))}
          </div>
        </div>
      </section>
      <footer className="px-4 py-4 w-full bg-gray-500">
        <p className="text-center">
          © 2024 Manhwa Heaven. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default ChapterPage;
