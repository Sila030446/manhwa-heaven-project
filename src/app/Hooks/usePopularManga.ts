"use client";
import { useEffect, useState } from "react";

type Types = {
  id: number;
  name: string;
  slug: string;
};

type Genres = {
  id: number;
  name: string;
  slug: string;
};

type Authors = {
  id: number;
  name: string;
  slug: string;
};

interface Manga {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: string;
  coverImageUrl: string;
  averageRating: number;
  type: Types[];
  genres: Genres[];
  authors: Authors[];
}

const usePopularManga = () => {
  const [mangaList, setMangaList] = useState<Manga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopularManga = async () => {
      try {
        const response = await fetch("http://localhost:8000/manga/popular");
        if (!response.ok) throw new Error("Failed to fetch popular manga");
        const data = await response.json();
        setMangaList(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularManga();
  }, []);

  return { mangaList, loading, error };
};

export default usePopularManga;
