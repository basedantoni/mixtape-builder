"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Sticker } from "@/types";
import { useStickerStore } from "@/hooks/use-sticker-store";

const stickers: Sticker[] = [
  { id: "1", src: "/img/sticker.png", alt: "sticker 1" },
  { id: "2", src: "/img/sale-sticker.png", alt: "sticker 2" },
  { id: "3", src: "/img/discount-sticker.png", alt: "sticker 3" },
  { id: "4", src: "/img/grunge-sticker.png", alt: "sticker 4" },
];

export const StickerToolbar = () => {
  const [draggedSticker, setDraggedSticker] = useState<Sticker | null>(null);
  const draggedStickerRef = useRef<HTMLDivElement | null>(null);
  const updateStickers = useStickerStore((state) => state.updateStickers);

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.body.addEventListener("touchmove", preventDefault, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  const handleDragStart = (sticker: Sticker) => {
    setDraggedSticker(sticker);
  };

  const handleDrag = (e: React.DragEvent) => {
    if (draggedSticker && draggedStickerRef.current) {
      draggedStickerRef.current.style.position = "fixed";
      draggedStickerRef.current.style.left = `${e.clientX - 40}px`;
      draggedStickerRef.current.style.top = `${e.clientY - 40}px`;
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (draggedSticker && draggedStickerRef.current) {
      updateStickers({ ...draggedSticker, x: e.clientX, y: e.clientY });

      // Reset the sticker position and state
      draggedStickerRef.current.style.position = "";
      draggedStickerRef.current.style.left = "";
      draggedStickerRef.current.style.top = "";
      setDraggedSticker(null);
    }
  };

  const handleTouchStart = (sticker: Sticker) => {
    setDraggedSticker(sticker);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (draggedSticker && draggedStickerRef.current) {
      const touch = e.touches[0];
      draggedStickerRef.current.style.position = "fixed";
      draggedStickerRef.current.style.left = `${touch.clientX - 180}px`;
      draggedStickerRef.current.style.top = `${touch.clientY - 390}px`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (draggedSticker && draggedStickerRef.current) {
      const touch = e.changedTouches[0];
      updateStickers({ ...draggedSticker, x: touch.clientX, y: touch.clientY });

      // Reset the sticker position and state
      draggedStickerRef.current.style.position = "";
      draggedStickerRef.current.style.left = "";
      draggedStickerRef.current.style.top = "";
      setDraggedSticker(null);
    }
  };

  return (
    <div className="flex flex-col items-center rounded flex-wrap">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          ref={draggedSticker?.id === sticker.id ? draggedStickerRef : null}
          draggable
          onDragStart={() => handleDragStart(sticker)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onTouchStart={() => handleTouchStart(sticker)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="cursor-move relative z-20"
        >
          <Image
            src={sticker.src}
            alt={sticker.alt}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
};
