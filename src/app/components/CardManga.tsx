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
    <Card className="grid grid-cols-1 justify-center items-center gap-y-0.5 p-2">
      <div className="relative flex flex-shrink-0 items-center justify-center max-w-[150px] min-h-[200px] md:max-w-[180px] md:min-h-[246px]">
        <Link href={`/${manga.slug}`}>
          <Image
            isZoomed
            src={manga.coverImageUrl}
            alt={manga.title}
            className="md:h-[246px] h-[200px]"
          />
        </Link>
        {manga.type &&
          manga.type.length > 0 &&
          manga.type.map((type) => (
            <Chip
              key={type.id}
              color="danger"
              size="sm"
              className="absolute top-1 right-1 z-10" // Positioning inside the image
            >
              {type.name}
            </Chip>
          ))}
      </div>
      <div className="text-center">
        <Link href={`/${manga.slug}`}>
          <h1 className="line-clamp-1 text-sm font-semibold text-white dark:text-white">
            {manga.title}
          </h1>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-1">
        {manga.chapters &&
          manga.chapters.slice(0, 2).map((chapter) => (
            <Link href={`/chapter/${chapter.slug}`} key={chapter.id}>
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
