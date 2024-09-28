"use client";

import { Mixtape } from "./mixtape";
import { Sticker } from "@/types";
import Image from "next/image";

const WIDTH = 200;
const HEIGHT = 200;

interface StaticMixtapeProps {
  title: string;
  stickers: Sticker[];
  rect: { x: number; y: number };
}

export const StaticMixtape = ({
  title,
  stickers,
  rect,
}: StaticMixtapeProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Mixtape title={title} />
      {stickers.map((sticker, index) => (
        <Image
          key={`${sticker.id}-${index}`}
          src={`https://mixtape-builder.vercel.app${sticker.src}`}
          alt={sticker.alt}
          width={WIDTH}
          height={HEIGHT}
          style={{
            position: "absolute",
            left: `${(sticker.x ?? 0) - rect.x - WIDTH / 2}px`,
            top: `${(sticker.y ?? 0) - rect.y - HEIGHT / 2}px`,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};
