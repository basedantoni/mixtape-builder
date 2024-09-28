import { Mixtape } from "./mixtape";
import { Sticker } from "@/types";
import Image from "next/image";

const WIDTH = 200;
const HEIGHT = 200;

interface StaticMixtapeProps {
  title: string;
  stickers: Sticker[];
}

export const StaticMixtape = ({ title, stickers }: StaticMixtapeProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Mixtape title={title} />
      {stickers.map((sticker, index) => (
        <Image
          key={`${sticker.id}-${index}`}
          src={sticker.src}
          alt={sticker.alt}
          width={WIDTH}
          height={HEIGHT}
          style={{
            position: "absolute",
            left: `${(sticker.x ?? 0) - 61.5 - WIDTH / 2}px`,
            top: `${(sticker.y ?? 0) - 88 - HEIGHT / 2}px`,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};
