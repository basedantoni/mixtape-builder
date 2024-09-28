import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { Sticker } from "@/types";

interface StickerState {
  droppedStickers: Sticker[];
  updateStickers: (newSticker: Sticker) => void;
  droppableElementRect: { x: number; y: number };
  updateDroppableElementRect: (newRect: { x: number; y: number }) => void;
  removeAllStickers: () => void;
}

export const useStickerStore = create<StickerState>()(
  devtools(
    (set) => ({
      droppedStickers: [],
      updateStickers: (newSticker: Sticker) =>
        set((state) => ({
          droppedStickers: [...state.droppedStickers, newSticker],
        })),
      droppableElementRect: { x: 0, y: 0 },
      updateDroppableElementRect: ({ x, y }: { x: number; y: number }) => {
        set(() => ({
          droppableElementRect: { x, y },
        }));
      },
      removeAllStickers: () => set({ droppedStickers: [] }),
    }),
    { name: "stickerStore" }
  )
);
