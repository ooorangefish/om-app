"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Play, AudioLines } from "lucide-react";
import { type Song } from "@/types";
import PlayContext from "@/context/PlayContext";
import AuthContext from "@/context/AuthContext";
import { useContext, useState } from "react";
import clsx from "clsx";
import { formatDuration } from "@/lib/utils";
import { add } from "@/lib/requests";

const TracklistHeader = ({
  type,
  title,
  creator,
  totalCount,
  coverImage,
}: {
  coverImage?: string;
  type: string;
  title: string;
  creator: { name: string; profileImage: string; id: string };
  totalCount: number;
}) => (
  <div className="flex items-center gap-x-8">
    {coverImage ? (
      <img src={coverImage} className="w-[200px] h-[200px] object-cover" />
    ) : (
      <div className="bg-gradient-to-r from-orange-100 to-orange-500 w-[200px] h-[200px] flex justify-center items-center">
        <Heart fill="#fff" color="#fff" className="w-[50px] h-[50px]" />
      </div>
    )}
    <div className="flex flex-col gap-y-4">
      <div className="text-xs">{type}</div>
      <div className="text-4xl font-semibold">{title}</div>
      <Link href={`/singer/${creator.id}`}>
        <div className="flex flex-row text-xs items-center">
          <Avatar>
            <AvatarImage className="object-cover" src={creator.profileImage} />
            <AvatarFallback>{creator.name}</AvatarFallback>
          </Avatar>
          <div className="mx-2">{creator.name}</div>
          <div className="">共 {totalCount} 首</div>
        </div>
      </Link>
    </div>
  </div>
);

const Tracklist = ({
  data,
  type,
  title,
  creator,
  coverImage,
}: {
  data: Song[];
  type?: string;
  title?: string;
  coverImage?: string;
  creator?: {
    name: string;
    profileImage: string;
    id: string;
  };
}) => {
  const playContext = useContext(PlayContext);
  const authContext = useContext(AuthContext);
  const [likedSongIdList, setLikedSongIdList] = useState<string[]>([]);
  const [unlikedSongIdList, setUnlikedSongIdList] = useState<string[]>([]);

  const handleLike = (song: Song) => {
    if (song.isLiked) {
      setUnlikedSongIdList((prev) => [...prev, song.id]);
      setLikedSongIdList((prev) => prev.filter((id) => id !== song.id));
      add("/unlikeSong", { songId: song.id, userId: authContext?.user?.id });
    } else {
      setUnlikedSongIdList((prev) => prev.filter((id) => id !== song.id));
      setLikedSongIdList((prev) => [...prev, song.id]);
      add("/likeSong", { songId: song.id, userId: authContext?.user?.id });
    }
  };

  return (
    <div className="flex flex-col gap-y-8">
      {type && title && creator && (
        <TracklistHeader
          coverImage={coverImage}
          type={type}
          title={title}
          creator={creator}
          totalCount={data.length}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>歌曲</TableHead>
            <TableHead>歌手</TableHead>
            <TableHead>专辑</TableHead>
            <TableHead className="text-right">时长</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              className={clsx("group hover:bg-secondary", {
                "bg-secondary": playContext?.currentPlaying?.id === item.id,
              })}
              onDoubleClick={() => playContext?.setCurrentPlaying(item)}
            >
              <TableCell onClick={() => handleLike(item)}>
                <Heart
                  className="w-4 h-4 text-white"
                  fill={
                    (item.isLiked && !unlikedSongIdList.includes(item.id)) ||
                    likedSongIdList.includes(item.id)
                      ? "#F97315"
                      : "white"
                  }
                  stroke={
                    (item.isLiked && !unlikedSongIdList.includes(item.id)) ||
                    likedSongIdList.includes(item.id)
                      ? "#F97315"
                      : "black"
                  }
                />
              </TableCell>
              <TableCell>
                {playContext?.currentPlaying?.id !== item.id && (
                  <p className="group-hover:hidden">{index + 1}</p>
                )}
                {playContext?.currentPlaying?.id === item.id ? (
                  <AudioLines className="w-4 h-4" />
                ) : (
                  <Play className="hidden group-hover:block w-4 h-4" />
                )}
              </TableCell>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Link href={"/singer" + `/${item.artist.id}`}>
                  {item.artist.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={"/album" + `/${item.album.id}`}>
                  {item.album.title}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                {formatDuration(Number(item.duration))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tracklist;
