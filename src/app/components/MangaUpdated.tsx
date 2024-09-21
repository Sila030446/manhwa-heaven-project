// MangaUpdated.tsx
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import CardManga from "./CardManga";

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

async function getAllManga(): Promise<Manga[] | null> {
  const response = await fetch(`http://localhost:8000/manga`);
  if (!response.ok) return null;
  const manga = await response.json();
  return manga;
}

const MangaUpdated = async () => {
  const mangas = await getAllManga();

  if (!mangas) return <div className="text-center my-10">No manga found</div>;
  return (
    <Card>
      <CardHeader>
        <h1>มังงะ อัพเดตใหม่</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
          {mangas.map(
            (
              manga: Manga // Use the Manga type here
            ) => (
              <CardManga key={manga.id} manga={manga} />
            )
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default MangaUpdated;
