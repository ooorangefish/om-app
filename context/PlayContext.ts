import { createContext } from "react";
import { type Song } from "@/types";

const PlayContext = createContext<{
  currentPlaying?: Song;
  setCurrentPlaying: (song: Song) => void;
} | null>(null);

export default PlayContext;
