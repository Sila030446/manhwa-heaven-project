import { Card, CardBody, Link, Image, Button } from "@nextui-org/react";
import { BookmarkIcon } from "lucide-react";
import React from "react";

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
  const response = await fetch(`http://localhost:8000/manga/${slug}`);
  if (!response.ok) return null;
  const manga: Manga = await response.json();
  return manga;
}

const ChaptersPage = async ({ params }: { params: { slug: string } }) => {
  const manga = await getManga(params.slug);

  if (!manga) return <div className="text-center my-10">No manga found</div>;

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
            <Link href={manga.slug} className="transition-colors">
              {manga.title}
            </Link>
          </div>
        </CardBody>
      </Card>

      {/* Manga Details Card */}
      <Card className="mt-4 py-4 gap-2 font-Kanit w-full">
        <div className="flex flex-col items-center text-center gap-y-2">
          <div className="overflow-hidden min-h-9 text-sm">
            <h1 className="text-lg">{manga.title}</h1>
            <h2 className="text-foreground-400">{manga.alternativeTitle}</h2>
          </div>
          <div className="max-w-[180px] flex flex-col gap-2">
            <Image src={manga.coverImageUrl} alt={manga.title} />
            <Button color="danger" startContent={<BookmarkIcon />}>
              Bookmark
            </Button>
          </div>
        </div>
        <div className="px-2 text-sm text-left leading-normal">
          <h3>เรื่องย่อ {manga.title}</h3>
          <p className="text-foreground-400">{manga.description}</p>
        </div>

        {/* Info Table */}
        <div className="px-4 py-4">
          <div>
            <h1>Type</h1>
            {manga.type.map((item) => (
              <p
                className="font-light text-sm text-foreground-400"
                key={item.id}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div>
            <h1>Status</h1>
            <p className="font-light text-sm text-foreground-400">
              {manga.status}
            </p>
          </div>
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
            <h1>CreateAt</h1>
            <p className="font-light text-sm text-foreground-400">
              {new Date(manga.createdAt).toLocaleDateString("th-TH")}
            </p>
          </div>
          <div>
            <h1>UpdateAt</h1>
            <p className="font-light text-sm text-foreground-400">
              {new Date(manga.updatedAt).toLocaleDateString("th-TH")}
            </p>
          </div>
          <h1>Genres</h1>
          <div className="flex flex-wrap overflow-auto gap-1">
            {manga.genres.map((genre) => (
              <div key={genre.id}>
                {/* Added margin for spacing */}
                <Link href={`genres/${genre.slug}`}>
                  <Button>{genre.name}</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Card>
      <Card className="h-[500px]">
        <CardBody>
          <div className="w-full">
            {manga.chapters.map((chapter) => (
              <Link
                className="w-full"
                key={chapter.chapterNumber}
                href={`/chapter/${chapter.slug}`}
              >
                <Button
                  endContent={
                    <p>
                      {new Date(chapter.createdAt).toLocaleDateString("th-TH")}
                    </p>
                  }
                  className="my-1"
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
