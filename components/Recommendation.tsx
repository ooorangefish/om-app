import { Disc3 } from "lucide-react";
import Link from "next/link";
import { get } from "@/lib/requests";
import { useState, useEffect } from "react";
import { type Album } from "@/types";

const Recommendation = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    get("/recommendations").then((res) => {
      setAlbums(res);
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div className="py-3 text-lg flex items-center gap-x-1 text-lg font-bold">
        <Disc3 />
        歌曲推荐
      </div>
      <div className="grid grid-cols-6 gap-4">
        {albums.map((item, index) => {
          return (
            <div className="h-50 mb-2 hover:text-orange-400" key={index}>
              <Link href={"/album/" + item.id}>
                <img src={item.coverImage} className="rounded h-48" />
                <p className="mt-2">{item.title}</p>
                <p className="text-gray-400 text-sm">{item.artist.name}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recommendation;
