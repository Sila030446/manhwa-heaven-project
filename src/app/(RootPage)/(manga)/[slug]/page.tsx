// app/manga/[slug]/page.tsx

import { Card, CardBody, Link, Image, Button } from "@nextui-org/react";
import { BookmarkIcon } from "lucide-react";
import React from "react";

// Define your interfaces
interface Type {
  id: number;
  name: string;
}

interface Author {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface Chapter {
  chapterNumber: number;
  slug: string;
  title: string;
  createdAt: string;
}

interface Manga {
  title: string;
  slug: string;
  alternativeTitle: string;
  coverImageUrl: string;
  description: string;
  type: Type[];
  status: string;
  authors: Author[];
  serialization: string;
  createdAt: string;
  updatedAt: string;
  genres: Genre[];
  chapters: Chapter[];
}

// Fetching manga data based on slug
async function getManga(slug: string): Promise<Manga | null> {
  const response = await fetch(`http://47.129.161.36/manga/${slug}`, {
    // Ensure the fetch runs on the server
    cache: "no-store", // or 'force-cache' based on your needs
  });
  if (!response.ok) return null;
  const manga: Manga = await response.json();
  return manga;
}

interface ChaptersPageProps {
  params: {
    slug: string;
  };
}

const ChaptersPage = async ({ params }: ChaptersPageProps) => {
  const manga = await getManga(params.slug);

  if (!manga) {
    return <div className="text-center my-10">No manga found</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 lg:px-16 flex items-center justify-center flex-col gap-2">
      {/* Manga Title Card */}
      <Card className="shadow-lg rounded-lg w-full">
        <CardBody className="p-4">
          <div className="flex flex-wrap gap-2 text-sm md:text-base font-Kanit text-gray-600">
            {/* Breadcrumb navigation */}
            <Link href="/" className="transition-colors">
              มังงะ อ่านมังงะ Manga Manhwa เว็บอ่านการ์ตูนออนไลน์
            </Link>
            <span>&gt;</span>
            <Link href={`/manga/${manga.slug}`} className="transition-colors">
              {manga.title}
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Manga Details Card */}
      <Card className="mt-4 p-4 gap-2 font-Kanit w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-y-2">
          <div className="min-w-[300px] md:min-w-[230px] flex flex-col gap-2">
            <Image src={manga.coverImageUrl} alt={manga.title} />
            <Button color="danger" startContent={<BookmarkIcon />}>
              Bookmark
            </Button>
            <div className="flex md:flex-col flex-row gap-1 text-sm">
              <div className="flex w-full gap-x-0.5 items-center justify-between p-2 bg-foreground-300 rounded-lg">
                <h1>Type</h1>
                {manga.type.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </div>
              <div className="flex w-full gap-x-0.5 items-center justify-between p-2 bg-foreground-300 rounded-lg">
                <p>Status</p>
                <span>{manga.status}</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden min-h-9 text-sm text-center md:text-start px-2">
            <h1 className="text-lg md:text-2xl">{manga.title}</h1>
            <h2 className="text-foreground-400 line-clamp-2">
              {manga.alternativeTitle}
            </h2>
            <div className="text-sm text-left leading-normal">
              <h3>เรื่องย่อ {manga.title}</h3>
              <p className="text-foreground-400">{manga.description}</p>
            </div>
            {/* Info Table */}
            <div className="text-start">
              <div>
                <h1>Author</h1>
                {manga.authors.map((author) => (
                  <p
                    className="font-light text-sm text-foreground-400"
                    key={author.id}
                  >
                    {author.name}
                  </p>
                ))}
              </div>
              <div>
                <h1>Serialization</h1>
                <p className="font-light text-sm text-foreground-400">
                  {manga.serialization}
                </p>
              </div>
              <div>
                <h1>Created At</h1>
                <p className="font-light text-sm text-foreground-400">
                  {new Date(manga.createdAt).toLocaleDateString("th-TH")}
                </p>
              </div>
              <div>
                <h1>Updated At</h1>
                <p className="font-light text-sm text-foreground-400">
                  {new Date(manga.updatedAt).toLocaleDateString("th-TH")}
                </p>
              </div>
              <h1>Genres</h1>
              <div className="flex flex-wrap overflow-auto gap-1">
                {manga.genres.map((genre) => (
                  <div key={genre.id}>
                    <Link href={`/genres/${genre.slug}`}>
                      <Button size="sm">{genre.name}</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Manga Chapters */}
      <Card className="h-[500px] w-full overflow-auto">
        <CardBody>
          <div className="w-full">
            {manga.chapters.map((chapter) => (
              <Link
                className="w-full text-foreground"
                key={chapter.chapterNumber}
                href={`/chapter/${chapter.slug}`}
              >
                <Button
                  variant="bordered"
                  endContent={
                    <span>
                      {new Date(chapter.createdAt).toLocaleDateString("th-TH")}
                    </span>
                  }
                  className="my-1 "
                  fullWidth
                >
                  {chapter.title}
                </Button>
              </Link>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ChaptersPage;
