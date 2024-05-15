"use client";
import { useEffect, useState, useContext } from "react";
import Tracklist from "@/components/TrackList";
import { type Song, type User } from "@/types";
import { get } from "@/lib/requests";
import AuthContext from "@/context/AuthContext";

const Mymusic = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [user, setUser] = useState<User[]>([]);
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext?.user?.id) {
      get("/getLikedSongs" + `?userId=${authContext?.user?.id}`).then((res) => {
        setSongs(res);
      });
    }
    console.log(user);
  }, [authContext?.user?.id]);

  return (
    <div className="pt-8 w-2/3 mx-auto">
      <Tracklist
        data={songs}
        type="播放列表"
        title="喜欢的音乐"
        creator={{
          id: " ",
          name: "you",
          profileImage: "/images/avatar.jpg",
        }}
      />
    </div>
  );
};

export default Mymusic;
