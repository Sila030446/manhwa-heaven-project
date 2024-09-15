"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";

const ScrapeManga = () => {
  const [mangas, setManga] = useState<{ title: string; mangaUrl: string }[]>(
    []
  );
  const [selectedManga, setSelectedManga] = useState<string | undefined>(
    undefined
  );

  const searchManga = async (searchQuery: string) => {
    if (!searchQuery.trim()) return; // Prevent fetching for empty input

    try {
      const response = await fetch(
        `http://localhost:8000/manga/search?q=${searchQuery}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const parsed: { title: string; mangaUrl: string }[] =
        await response.json();
      setManga(parsed); // Update state with fetched manga titles
      console.log(parsed); // Log the entire parsed response for debugging
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  return (
    <section className="m-10 grid grid-cols-3 gap-5">
      <Card className="col-span-2">
        <CardBody>
          <Tabs>
            <Tab key="makimaaaaaa" title="Makimaaaaaa.com">
              <Input
                type="text"
                label="Search for a Manga Title"
                onChange={(e) => searchManga(e.target.value)}
              />
              <div className="w-full min-h-[200px] max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 mt-5">
                <Listbox
                  aria-label="Manga Titles"
                  onAction={(key) => setSelectedManga(key as string)}
                >
                  {mangas.map((manga) => (
                    <ListboxItem
                      key={manga.title} // Use manga.title as a key for better stability
                      color="primary"
                      className="text-primary-500"
                      value={manga.title}
                    >
                      {manga.title}
                    </ListboxItem>
                  ))}
                </Listbox>
              </div>
            </Tab>
            <Tab key="Reapertrans" title="Reapertrans.com">
              <Card>
                <CardBody>
                  <Input type="text" label="Scrape data for a specific URL" />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Go-manga" title="Go-manga.com">
              <Card>
                <CardBody>
                  <Input type="text" label="Scrape data for a specific URL" />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5">
          {selectedManga && (
            <h1 className="text-xl">Scrape data for {selectedManga}</h1>
          )}
          <Button size="lg" className="w-full" color="primary">
            Scrape
          </Button>
        </CardFooter>
      </Card>

      <div className="col-span-3"></div>
    </section>
  );
};

export default ScrapeManga;
