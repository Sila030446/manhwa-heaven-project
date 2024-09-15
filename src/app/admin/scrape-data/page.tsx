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
  Spinner,
  Divider,
} from "@nextui-org/react";
import axios from "axios";
import Swal from "sweetalert2";
import ScrapeQueue from "@/app/components/ScrapeQueue";

const ScrapeManga = () => {
  const [mangas, setManga] = useState<{ title: string; mangaUrl: string }[]>(
    []
  );
  const [selectedManga, setSelectedManga] = useState<
    { title: string; mangaUrl: string } | undefined
  >(undefined);
  const [activeTabKey, setActiveTabKey] = useState<string>("makima");
  const [loading, setLoading] = useState<boolean>(false);

  const searchManga = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `http://localhost:8000/manga/search?q=${searchQuery}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const parsed: { title: string; mangaUrl: string }[] =
        await response.json();
      setManga(parsed);
    } catch (error) {
      console.error("Error fetching manga:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const startScrapping = async () => {
    if (!selectedManga) {
      Swal.fire({
        icon: "error",
        title: "No Manga Selected",
        text: "Please select a manga to scrape!",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8000/job", {
        url: selectedManga.mangaUrl,
        jobType: { type: activeTabKey }, // Send the active tab key as the job type
      });

      Swal.fire({
        icon: "success",
        title: "Scrape Started",
        text: `Scrape job for "${selectedManga.title}" started successfully!`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Scraping Failed",
        text: "Error starting the scrape job. Please try again later.",
      });
      console.error("Error starting the scrape job:", error);
    }
  };

  return (
    <section className="p-10 grid grid-cols-3 gap-6">
      <Card className="col-span-2 shadow-lg rounded-lg border border-gray-200">
        <CardBody>
          <h2 className="text-2xl font-semibold mb-5 text-center">
            Scrape Manga Data
          </h2>
          <Divider />
          <Tabs
            selectedKey={activeTabKey}
            onSelectionChange={(key) => setActiveTabKey(String(key))}
            aria-label="Manga Sources"
            className="mt-5"
          >
            <Tab key="makima" title="Makimaaaaaa.com">
              <div className="mt-5">
                <Input
                  type="text"
                  label="Search for a Manga Title"
                  className="mb-5"
                  placeholder="Enter manga title"
                  fullWidth
                  onChange={(e) => searchManga(e.target.value)}
                />
                <div className="w-full min-h-[200px] max-w-full border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Spinner color="primary" size="lg" />
                    </div>
                  ) : mangas.length === 0 ? (
                    <div className="text-center text-gray-500">
                      No manga found. Try searching for a title.
                    </div>
                  ) : (
                    <Listbox
                      className="overflow-y-scroll max-h-80"
                      aria-label="Manga Titles"
                      onAction={(key) => {
                        const selected = mangas.find(
                          (manga) => manga.title === key
                        );
                        if (selected) {
                          setSelectedManga(selected);
                        }
                      }}
                    >
                      {mangas.map((manga) => (
                        <ListboxItem
                          key={manga.title}
                          color="primary"
                          className="text-primary-500 w-full"
                          value={manga.title}
                        >
                          {manga.title}
                        </ListboxItem>
                      ))}
                    </Listbox>
                  )}
                </div>
              </div>
            </Tab>
            <Tab key="reapertrans" title="Reapertrans.com">
              <Card className="mt-5 shadow-none">
                <CardBody>
                  <Input
                    type="text"
                    label="Scrape data for a specific URL"
                    placeholder="Enter URL to scrape"
                    fullWidth
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="go-manga" title="Go-manga.com">
              <Card className="mt-5 shadow-none">
                <CardBody>
                  <Input
                    type="text"
                    label="Scrape data for a specific URL"
                    placeholder="Enter URL to scrape"
                    fullWidth
                  />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <CardFooter className="flex flex-col gap-5">
          {selectedManga && (
            <h1 className="text-xl text-center font-semibold">
              Ready to scrape:{" "}
              <span className="text-blue-600">{selectedManga.title}</span>
            </h1>
          )}
          <Button
            size="lg"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={startScrapping}
            disabled={!selectedManga}
          >
            Start Scraping
          </Button>
        </CardFooter>
      </Card>
      <ScrapeQueue />
    </section>
  );
};

export default ScrapeManga;
