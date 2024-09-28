"use client";

import { Mixtape } from "./mixtape";
import { Sticker } from "@/types";

import stickerImg from "@/public/img/sticker.png";
import discountStickerImg from "@/public/img/discount-sticker.png";
import grungeStickerImg from "@/public/img/grunge-sticker.png";
import saleStickerImg from "@/public/img/sale-sticker.png";

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
      {stickers.map((sticker, index) => {
        const stickerSource = sticker.src?.includes("grunge")
          ? grungeStickerImg
          : sticker.src?.includes("sale")
          ? saleStickerImg
          : sticker.src?.includes("discount")
          ? discountStickerImg
          : stickerImg;

        return (
          <Image
            key={`${sticker.id}-${index}`}
            src={stickerSource}
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
        );
      })}
    </div>
  );
};
