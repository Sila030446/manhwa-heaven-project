import { Card, Image, Button, Chip, Link } from "@nextui-org/react";
import timeSince from "../utils/timeSince";

interface Chapter {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

interface Type {
  id: number;
  name: string;
  slug: string;
}

interface Manga {
  id: number;
  title: string;
  slug: string;
  coverImageUrl: string;
  chapters: Chapter[];
  type: Type[];
}

interface CardMangaProps {
  manga: Manga;
}

const CardManga: React.FC<CardMangaProps> = ({ manga }) => {
  return (
    <Card className="flex flex-col items-center justify-center p-4 gap-y-2 flex-shrink-0">
      {/* Image and Chip */}
      <div className="relative flex items-center justify-center max-w-[150px] min-h-[200px] md:max-w-[180px] md:min-h-[246px]">
        <Link href={`/${manga.slug}`}>
          <Image
            isZoomed
            src={manga.coverImageUrl}
            alt={manga.title}
            className="md:h-[246px] h-[200px] object-cover"
          />
        </Link>
        {manga.type &&
          manga.type.length > 0 &&
          manga.type.map((type) => (
            <Chip
              key={type.id}
              color="danger"
              size="sm"
              className="absolute top-1 right-1 z-10"
            >
              {type.name}
            </Chip>
          ))}
      </div>

      {/* Manga Title */}
      <div className="text-center">
        <Link href={`/${manga.slug}`}>
          <h1 className="line-clamp-1 text-sm font-semibold text-white">
            {manga.title}
          </h1>
        </Link>
      </div>

      {/* Chapters */}
      <div className="w-full flex flex-col items-center gap-1">
        {manga.chapters &&
          manga.chapters.slice(0, 2).map((chapter) => (
            <Link
              href={`/chapter/${chapter.slug}`}
              key={chapter.id}
              className="w-full"
            >
              <Button
                size="sm"
                fullWidth
                className="flex items-center justify-between"
              >
                <p className="text-xs font-medium">{chapter.title}</p>
                <p className="text-foreground-500 text-xs font-medium">
                  {timeSince(chapter.createdAt)}
                </p>
              </Button>
            </Link>
          ))}
      </div>
    </Card>
  );
};

export default CardManga;
