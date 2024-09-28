import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension";
import { Sticker } from "@/types";

interface StickerState {
  droppedStickers: Sticker[];
  updateStickers: (newSticker: Sticker) => void;
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
      removeAllStickers: () => set({ droppedStickers: [] }),
    }),
    { name: "stickerStore" }
  )
);
