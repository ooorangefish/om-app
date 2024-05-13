"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { get } from "@/lib/requests";
import { type Artist } from "@/types";
import clsx from "clsx";

const typeList = ["全部", "男", "女", "组合"];
const areaList = ["全部", "内地", "港台", "日本", "欧美"];

const SingerFilter = () => {
  const [type, setType] = useState("全部");
  const [area, setArea] = useState("全部");
  const [singers, setSingers] = useState<Artist[]>([]);

  useEffect(() => {
    get("/artists").then((res) => setSingers(res));
  }, []);

  return (
    <div className="w-2/3 mx-auto pt-8">
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-x-10 text-lg">
          <p>类型</p>
          {typeList.map((item, index) => {
            return (
              <p
                onClick={() => setType(item)}
                className={clsx(
                  "w-16 text-center px-2 rounded-sm cursor-pointer",
                  {
                    "bg-primary text-white": type === item,
                  },
                )}
                key={index}
              >
                {item}
              </p>
            );
          })}
        </div>
        <div className="flex flex-row gap-x-10 text-lg">
          <p>地区</p>
          {areaList.map((item) => {
            return (
              <p
                onClick={() => setArea(item)}
                className={clsx(
                  "w-16 text-center px-2 rounded-sm cursor-pointer",
                  {
                    "bg-primary text-white": area === item,
                  },
                )}
                key={item}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row gap-8 mt-10 flex-wrap">
        {singers
          .filter((item) => item.type === type || type === "全部")
          .filter((item) => item.location === area || area === "全部")
          .map((item) => {
            return (
              <Link
                key={item.name}
                href={"/singer/" + item.id}
                className="font-bold"
              >
                <div className="flex flex-col items-center gap-y-4">
                  <Avatar className="w-[100px] h-[100px]">
                    <AvatarImage
                      className="object-cover"
                      src={item.profileImage}
                    />
                    <AvatarFallback>{item.name}</AvatarFallback>
                  </Avatar>
                  <div>{item.name}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
export default SingerFilter;
