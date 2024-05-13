import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Music } from "lucide-react";
import { useState, useEffect } from "react";
import { type Album } from "@/types";
import { get } from "@/lib/requests";
import Link from "next/link";

const NewSongs = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    get("/newReleases").then((res) => {
      setAlbums(res);
    });
  }, []);

  return (
    <div>
      <div className="py-3 text-lg flex items-center gap-x-1 text-lg font-bold">
        <Music /> 新歌上架
      </div>
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {albums.map((item, index) => (
              <CarouselItem key={index} className="lg:basis-1/5">
                <Link href={"/album/" + item.id}>
                  <div className="p-1">
                    <Card className="border-none shadow-none">
                      <img src={item.coverImage} />
                      <p className="mt-2">{item.title}</p>
                      <p className="text-gray-400 text-sm">
                        {item.artist.name}
                      </p>
                    </Card>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default NewSongs;
