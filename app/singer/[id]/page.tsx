"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Tracklist from "@/components/TrackList";
import { Song, Artist, Album } from "@/types";
import { get } from "@/lib/requests";
import { format } from "date-fns";
import Link from "next/link";
import { MapPinned, UsersRound } from "lucide-react";

const ArtistInfo = ({ data }: { data?: Artist }) => (
  <div>
    <div className="w-2/3 mx-auto flex flex-col gap-y-2 h-full justify-center">
      <div className="flex gap-4 items-center flex-col">
        <Avatar className="w-[200px] h-[200px]">
          <AvatarImage src={data?.profileImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-3xl font-black">{data?.name}</p>
          <div className="flex gap-x-4">
            <div className="flex gap-x-2">
              <UsersRound />
              <p>女</p>
            </div>
            <div className="flex gap-x-2">
              <MapPinned />
              <p>中国</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SingerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [artist, setArtist] = useState<Artist>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    get(`/artist?id=${id}`).then((res) => {
      setArtist(res);
    });

    get(`/albumsByArtistId?artistId=${id}`).then((res) => {
      setAlbums(res);
    });

    get(`/songsByArtistId?artistId=${id}`).then((res) => {
      setSongs(res);
    });
  }, []);

  return (
    <div className="flex pt-8">
      <div className="grow">
        <ArtistInfo data={artist} />
      </div>
      <div className="w-2/3 px-8">
        <div>
          <div className="text-xl font-bold pb-4">热门歌曲</div>
          <Tracklist data={songs} />
        </div>
        <div className="mt-16">
          <div className="text-xl font-bold pb-4">所有专辑</div>
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
        </div>
      </div>
    </div>
  );
};
export default SingerPage;
