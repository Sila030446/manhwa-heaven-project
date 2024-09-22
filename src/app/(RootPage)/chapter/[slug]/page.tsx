"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Image, Button, Progress } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

interface Page {
  id: number;
  imageUrl: string;
  pageNumber: number;
}

interface Chapter {
  title: string;
  pages: Page[];
  prevChapterSlug?: string;
  nextChapterSlug?: string;
}

interface ChapterApiResponse {
  currentChapter: {
    title: string;
    slug: string;
    pages: Page[];
  };
  previousSlug: string | null;
  nextSlug: string | null;
}

async function fetchPages(slug: string): Promise<Chapter | null> {
  try {
    const response = await fetch(`http://localhost:8000/manga/pages/${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data: ChapterApiResponse = await response.json();

    return {
      title: data.currentChapter.title,
      pages: data.currentChapter.pages,
      prevChapterSlug: data.previousSlug ?? undefined,
      nextChapterSlug: data.nextSlug ?? undefined,
    };
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    return null;
  }
}

const ChapterPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
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

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollPosition / pageHeight) * 100;
    setScrollProgress(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPreviousChapter = () => {
    if (chapter?.prevChapterSlug) {
      router.push(`/chapter/${chapter.prevChapterSlug}`);
    }
  };

  const goToNextChapter = () => {
    if (chapter?.nextChapterSlug) {
      router.push(`/chapter/${chapter.nextChapterSlug}`);
    }
  };

  if (loading) {
    return <div className="text-center my-10 h-screen">Loading pages...</div>;
  }

  if (!chapter || !chapter.pages) {
    return (
      <div className="text-center my-10">No pages found for {params.slug}</div>
    );
  }

  return (
    <>
      <section className="content">
        <div className="flex flex-col items-center gap-1">
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

          <div className="w-[100%] z-50 fixed bottom-0 flex justify-between items-center gap-1 px-1 py-1 bg-gray-500/50">
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
            {chapter.pages.map((page) => (
              <Image
                onContextMenu={(e) => e.preventDefault()}
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
    </>
  );
};

export default ChapterPage;
