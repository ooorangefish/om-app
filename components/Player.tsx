"use client";
import React from "react";
import { PlayCircle, SkipForward, SkipBack, PauseCircle } from "lucide-react";
import ReactPlayer from "react-player";
import PlayContext from "@/context/PlayContext";
import { formatDuration } from "@/lib/utils";

const Player = () => {
  const [playing, setPlaying] = React.useState(false);
  const playerRef = React.createRef<ReactPlayer>();
  const [progress, setProgress] = React.useState(0);
  const [seekTo, setSeekTo] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const [seeking, setSeeking] = React.useState(false);
  const [duration, setDuration] = React.useState<number>();
  const playContext = React.useContext(PlayContext);
  const [playedSeconds, setPlayedSeconds] = React.useState<number>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (playContext?.currentPlaying) {
      if (!playing) {
        setPlaying(true);
      }
    }
  }, [playContext?.currentPlaying]);

  const handlePlay = () => {
    setPlaying((prev) => !prev);
  };

  const handleSeekMouseDown = (e: any) => {
    setSeeking(true);
  };

  const handleSeekChange = (e: any) => {
    setProgress(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: any) => {
    setSeeking(false);

    playerRef.current?.seekTo(parseFloat(e.target.value));
  };

  return mounted && playContext?.currentPlaying ? (
    <div className="fixed bottom-0 left-0 w-full h-[100px] flex justify-center  bg-white shadow-xl rounde-2xl shadow-black p-4">
      <div className="w-2/3 flex items-center gap-y-4">
        <div className="flex items-center gap-x-4">
          <img
            src={playContext?.currentPlaying?.album.coverImage}
            className="w-20 h-20 bg-primary"
          />
          <div>
            <p>{playContext?.currentPlaying?.title}</p>
            <p className="text-sm text-slate-500">
              {playContext?.currentPlaying?.artist.name}
            </p>
          </div>
        </div>
        <div className="flex flex-col grow items-center">
          <ReactPlayer
            className="hidden"
            url={playContext?.currentPlaying?.filePath}
            ref={playerRef}
            playing={playing}
            onProgress={(progress) => {
              setProgress(progress.played);
              setPlayedSeconds(progress.playedSeconds);
            }}
            onDuration={(duration) => setDuration(duration)}
            onEnded={() => setPlaying(false)}
          />
          <div className="flex items-center gap-x-4">
            <SkipBack className="text-black h-6 w-6" />
            {playing ? (
              <PauseCircle
                className="text-black h-8 w-8 cursor-pointer"
                onClick={handlePlay}
              />
            ) : (
              <PlayCircle
                className="text-black h-8 w-8 cursor-pointer"
                onClick={handlePlay}
              />
            )}
            <SkipForward className="text-black h-6 w-6" />
          </div>
          <div className="w-2/3 flex items-center mt-2 gap-x-4">
            <p>{formatDuration(playedSeconds || 0)}</p>
            <div className="grow relative">
              <div
                className="absolute top-1/2 left-0 bg-black rounded-full z-10 h-[6px] -translate-y-1/2"
                style={{
                  width: `${progress * 100}%`,
                }}
              />
              <input
                className="w-full accent-black relative z-20"
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={progress}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                onChange={handleSeekChange}
              />
            </div>
            <p>{formatDuration(duration || 0)}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;
