"use client";

import { useState, useRef, useEffect } from "react";
import { Mixtape } from "@/components/mixtape/mixtape";
import { Sticker } from "@/types";
import { useStickerStore } from "@/hooks/use-sticker-store";
import Image from "next/image";

const WIDTH = 200;
const HEIGHT = 200;

export const DroppableMixtape = ({ title }: { title: string }) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const mixtapeRef = useRef<HTMLDivElement>(null);
  const droppedStickers = useStickerStore((state) => state.droppedStickers);
  const updateDroppableElementRect = useStickerStore(
    (state) => state.updateDroppableElementRect
  );

  useEffect(() => {
    if (mixtapeRef.current) {
      const rect = mixtapeRef.current.getBoundingClientRect();

      const adjustedStickers = droppedStickers.map((sticker) => ({
        ...sticker,
        x: (sticker.x ?? 0) - rect.left - WIDTH / 2,
        y: (sticker.y ?? 0) - rect.top - HEIGHT / 2,
      }));

      setStickers(adjustedStickers);
      updateDroppableElementRect({ x: rect.left, y: rect.top });
    }
  }, [droppedStickers]);

  return (
    <div ref={mixtapeRef} className="relative overflow-hidden rounded-2xl">
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
            left: `${sticker.x}px`,
            top: `${sticker.y}px`,
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};
