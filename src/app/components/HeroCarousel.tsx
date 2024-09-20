"use client";
import React from "react";
import Slider from "react-slick";
import usePopularManga from "../Hooks/usePopularManga";
import { Card, Chip, Skeleton } from "@nextui-org/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "@nextui-org/react";
import Image from "next/image";

const HeroCarousel: React.FC = () => {
  const { mangaList, loading, error } = usePopularManga();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    autoplaySpeed: 5000,
    fade: true, // Add smooth fade transition between slides
    pauseOnHover: true, // Pause autoplay on hover for better user interaction
  };

  if (loading) {
    return (
      <div className="p-4 rounded-lg">
        <div className="w-full h-full">
          {/* Skeleton for image */}
          <Skeleton className="w-full h-64 rounded-lg" />
          {/* Skeleton for title */}
          <Skeleton className="w-1/2 h-6 mt-4 rounded-lg" />
          {/* Skeleton for genres */}
          <Skeleton className="w-1/3 h-4 mt-2 rounded-lg" />
          {/* Skeleton for description */}
          <Skeleton className="w-full h-12 mt-4 rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 rounded-lg">
      <Slider {...settings} className="max-w-full">
        {mangaList.map((manga) => (
          <div key={manga.id} className="w-full h-full">
            <div className="absolute -z-10 rounded-xl">
              <Image
                src={manga.coverImageUrl}
                objectFit="cover"
                width={1500}
                height={350}
                alt={manga.title}
              />
            </div>
            <Card
              className={`h-full flex flex-col md:flex-row bg-dark-200 p-3 rounded-lg shadow-xl max-w-[100%] min-h-[100%] mx-auto backdrop-blur-xl filter backdrop-brightness-50`}
            >
              <div className="flex-shrink-0">
                <Link href={manga.slug}>
                  <Image
                    src={manga.coverImageUrl}
                    alt={manga.title}
                    width={1920}
                    height={1080}
                    objectFit="cover"
                    quality={100}
                    className="w-full md:w-48 h-64 md:h-80 rounded-lg object-cover"
                  />
                </Link>
              </div>
              <div className="mt-4 md:mt-0 md:ml-4 flex-grow">
                <div className="flex justify-between items-center mb-2">
                  <Link color="foreground" href={manga.slug}>
                    <h3 className="font-semibold text-lg md:text-2xl font-Kanit text-white">
                      {manga.title}
                    </h3>
                  </Link>
                  {manga.type.map((type) => (
                    <Link key={type.id} href={`/type/${type.slug}`}>
                      <Chip className="mx-0.5 my-0.5" color="danger">
                        {type.name}
                      </Chip>
                    </Link>
                  ))}
                </div>
                <div className="flex flex-wrap mb-2">
                  {manga.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      className="mx-0.5 mb-0.5 overflow-hidden"
                      href={`/genre/${genre.slug}`}
                    >
                      <Chip color="warning">{genre.name}</Chip>
                    </Link>
                  ))}
                </div>
                <p className="text-foreground-500 font-Kanit text-sm md:text-base line-clamp-3 mb-2 overflow-hidden">
                  {manga.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <Chip size="md" color="success">
                    {manga.status}
                  </Chip>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
