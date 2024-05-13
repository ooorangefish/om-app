"use client";
import "@/app/globals.css";
import React from "react";
import Header from "@/components/Header";
import Player from "@/components/Player";
import PlayContext from "@/context/PlayContext";
import AuthContext from "@/context/AuthContext";
import { Song, User } from "@/types";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentPlaying, setCurrentPlaying] = React.useState<Song>();
  const [userInfo, setUserInfo] = React.useState<User | null>();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <AuthContext.Provider value={{ user: userInfo, setUserInfo }}>
          <Header />
          <PlayContext.Provider value={{ currentPlaying, setCurrentPlaying }}>
            <div className="pt-[100px]">{children}</div>
            <Player />
          </PlayContext.Provider>
          <div className="w-full py-3 mt-[100px]">
            <div className="w-full justify-center flex">
              copyright @ooorange fish
            </div>
          </div>
        </AuthContext.Provider>
        <Toaster />
      </body>
    </html>
  );
}
