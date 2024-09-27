"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Image, Button, Progress, Select, SelectItem } from "@nextui-org/react";
import { ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import Head from "next/head"; // Import Head for metadata

interface Page {
  id: number;
  imageUrl: string;
  pageNumber: number;
}

interface Chapters {
  id: number;
  title: string;
  slug: string;
}

interface Chapter {
  title: string;
  pages: Page[];
  prevChapterSlug?: string;
  nextChapterSlug?: string;
  allChapters: Chapters[];
}

interface ChapterApiResponse {
  currentChapter: {
    title: string;
    slug: string;
    pages: Page[];
  };
  previousSlug: string | null;
  nextSlug: string | null;
  allChapters: Chapters[];
}

// Fetch chapter data from the server
const fetchPages = async (slug: string): Promise<Chapter | null> => {
  try {
    const response = await fetch(
      `https://api.nexamanga.online/manga/pages/${slug}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: ChapterApiResponse = await response.json();

    return {
      title: data.currentChapter.title,
      pages: data.currentChapter.pages,
      prevChapterSlug: data.previousSlug ?? undefined,
      nextChapterSlug: data.nextSlug ?? undefined,
      allChapters: data.allChapters,
    };
  } catch (error) {
    console.error("Error fetching chapter data:", error);
    return null;
  }
};

interface ChapterPageProps {
  params: { slug: string };
}

const ChapterPage: React.FC<ChapterPageProps> = ({ params }) => {
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const loadChapterData = useCallback(async () => {
    const data = await fetchPages(params.slug);
    setChapter(data);
    setLoading(false);
  }, [params.slug]);

  useEffect(() => {
    loadChapterData();
  }, [loadChapterData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPosition / pageHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChapterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSlug = event.target.value;
    if (selectedSlug) {
      router.push(`/chapter/${selectedSlug}`);
    }
  };

  if (loading) {
    return <div className="text-center my-10 h-screen">Loading pages...</div>;
  }

  if (!chapter || !chapter.pages.length) {
    return (
      <div className="text-center my-10">No pages found for {params.slug}</div>
    );
  }

  return (
    <section className="content container mx-auto my-5">
      {/* SEO Metadata */}
      <Head>
        <title>{`Read ${chapter.title} | Nexamanga`}</title>
        <meta
          name="description"
          content={`Read the latest chapter "${chapter.title}" on Nexamanga. Enjoy high-quality images and seamless reading experience.`}
        />
        <meta
          name="keywords"
          content={`manga, manhwa, manhua, online manga reader, ${chapter.title}, nexamanga`}
        />
        <meta
          property="og:title"
          content={`Read ${chapter.title} | Nexamanga`}
        />
        <meta
          property="og:description"
          content={`Enjoy reading ${chapter.title} online. High-quality manga, manhwa, and manhua reader.`}
        />
        <meta property="og:image" content={chapter.pages[0].imageUrl} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.nexamanga.com/chapter/${params.slug}`}
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={`Read ${chapter.title} | Nexamanga`}
        />
        <meta
          property="twitter:description"
          content={`Read the latest chapter of ${chapter.title} on Nexamanga.`}
        />
        <meta property="twitter:image" content={chapter.pages[0].imageUrl} />
        <link
          rel="canonical"
          href={`https://www.nexamanga.com/chapter/${params.slug}`}
        />
      </Head>

      {/* Chapter Selector Dropdown */}
      <div className="mb-4 w-[90%] md:w-[300px]">
        <Select
          size="sm"
          label="Select Chapter"
          onChange={onChapterChange}
          value={params.slug}
          placeholder={chapter.title}
        >
          {chapter.allChapters.map((ch) => (
            <SelectItem key={ch.slug} value={ch.slug}>
              {ch.title}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col items-center gap-1">
        <h1>{chapter.title}</h1>

        <div>
          {chapter.pages.map((page) => (
            <Image
              key={page.id}
              src={page.imageUrl}
              alt={`Page ${page.pageNumber}`}
              width="100%"
              height="100%"
              loading="lazy"
              style={{ borderRadius: 0 }}
              onClick={() =>
                window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
              }
              onContextMenu={(e) => e.preventDefault()}
            />
          ))}

          <div className="fixed bottom-11 right-1 z-50">
            <Button
              radius="full"
              isIconOnly
              className="bg-gray-500/50 backdrop-blur-none"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ChevronUp />
            </Button>
          </div>

          <div className="w-full z-50 sticky bottom-0 flex justify-between items-center gap-1 px-1 py-1 bg-gray-500/50">
            <Button
              size="sm"
              isIconOnly
              disabled={!chapter.prevChapterSlug}
              onClick={() =>
                onChapterChange({
                  target: { value: chapter.prevChapterSlug || "" },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              aria-label="Previous Chapter"
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
              onClick={() =>
                onChapterChange({
                  target: { value: chapter.nextChapterSlug || "" },
                } as React.ChangeEvent<HTMLSelectElement>)
              }
              aria-label="Next Chapter"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterPage;
