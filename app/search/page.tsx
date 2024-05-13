"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { get } from "@/lib/requests";
import { Artist, Song, Album } from "@/types";
import Tracklist from "@/components/TrackList";
import { format } from "date-fns";

const singer = [
  { name: "周杰伦", pic: "/images/心.avif", type: "男歌手" },
  { name: "周杰伦", pic: "/images/心.avif", type: "男歌手" },
  { name: "周杰伦", pic: "/images/心.avif", type: "男歌手" },
];
const singerSong = [
  { name: "爱是昂贵的", singer: "声音玩具", album: "劳动之余", time: "08:06" },
  { name: "秋分", singer: "蛙池", album: "郊游", time: "04:05" },
  { name: "爱是昂贵的", singer: "声音玩具", album: "劳动之余", time: "3:05" },
];

const SearchNew = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [playIndex, setPlayIndex] = useState(-1);
  const [adding, setAdding] = useState(-1);
  const [songs, setSongs] = useState<Song[]>([]);
  const [singers, setSingers] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    get(`/search?name=${query}`).then((res) => {
      const songs = res.filter((item: any) => item.type === "song");
      const singers = res.filter((item: any) => item.type === "artist");
      const albums = res.filter((item: any) => item.type === "album");

      setSongs(songs);
      setSingers(singers);
      setAlbums(albums);
    });
  }, [query]);

  return (
    <div className="flex flex-col justify-center w-2/3 mx-auto gap-y-8">
      <div className="flex flex-col gap-y-4">
        <p className="text-lg font-bold">歌手</p>
        <div className="grid grid-cols-6">
          {singers.length ? (
            singers.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={"/singer/" + item.id}
                  className="font-bold w-fit"
                >
                  <div className="w-fit flex flex-col items-center gap-y-4 group">
                    <Avatar className="w-[100px] h-[100px]">
                      <AvatarImage
                        className="object-cover"
                        src={item.profileImage}
                      />
                      <AvatarFallback>{item.name}</AvatarFallback>
                    </Avatar>
                    <div className="group-hover:text-primary">{item.name}</div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="h-8 flex items-center text-slate-500">
              没有找到相关歌手
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-lg font-bold">歌曲</p>
        {songs.length ? (
          <Tracklist data={songs} />
        ) : (
          <div className="h-8 flex items-center text-slate-500">
            没有找到相关歌曲
          </div>
        )}
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-lg font-bold">专辑</p>
        {albums.length ? (
          <div className="grid grid-cols-3 gap-y-8">
            {albums.map((album) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <div className="flex gap-4 items-end group">
                  <img
                    src={album.coverImage}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <p className="text-lg font-bold group-hover:text-primary">
                      {album.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {format(album.releaseDate, "yyyy-MM-dd")}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-8 flex items-center text-slate-500">
            没有找到相关专辑
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchNew;
