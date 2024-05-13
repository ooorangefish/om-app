// import '@/app/globals.css'
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Disc3 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import NewSongs from "@/components/NewSongs";
import Recommendation from "@/components/Recommendation";
import Posters from "@/components/Posters";

const titles = [
  { name: "发现音乐", link: "/discover" },
  { name: "我的音乐", link: "/myMusic" },
  { name: "歌手", link: "/singerFilter" },
  { name: "成为音乐人", link: "/becomeSinger" },
];
const pictures = [
  "https://plus.unsplash.com/premium_photo-1664302427357-40eb7c8fd3c0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1599467556385-48b57868f038?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNpbmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzaWN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fG11c2ljfGVufDB8fDB8fHww",
];
const musicRec = [
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
];
const newRec = [
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
  { name: "鲜花", pic: "/images/鲜花.jpeg", signer: "回春丹" },
];

export default function Home() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <div className="mx-auto flex flex-col gap-y-4 pt-8 px-16">
      <Posters />
      <NewSongs />
      <Recommendation />
    </div>
  );
}
