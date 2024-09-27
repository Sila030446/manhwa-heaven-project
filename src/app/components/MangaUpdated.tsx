// app/components/MangaUpdated.tsx

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

// Fetching all manga data
async function getAllManga(): Promise<Manga[] | null> {
  const response = await fetch(`https://api.nexamanga.online/manga`, {
    // Adjust cache behavior as needed
    // 'no-store' for always fresh data
    // 'force-cache' or other options based on your requirements
    cache: "no-store",
    // Revalidate after a certain time if using caching
    // next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    console.error("Failed to fetch manga:", response.statusText);
    return null;
  }

  try {
    const manga: Manga[] = await response.json();
    return manga;
  } catch (error) {
    console.error("Error parsing manga data:", error);
    return null;
  }
}

const MangaUpdated = async () => {
  const mangas = await getAllManga();

  if (!mangas || mangas.length === 0) {
    return <div className="text-center my-10">No manga found</div>;
  }

  return (
    <Card className="my-8">
      <CardHeader>
        <h1 className="text-2xl font-bold">มังงะ อัพเดตใหม่</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mangas.map((manga: Manga) => (
            <CardManga key={manga.id} manga={manga} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default MangaUpdated;
