import create from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  navSize: "large" | "small";
  toggleNavSize: () => void;
};

export const useSidebarSizeStore = create(
  persist<Store>(
    (set, get) => ({
      navSize: "small",
      toggleNavSize() {
        if (get().navSize === "small") set({ navSize: "large" });
        else set({ navSize: "small" });
      },
    }),
    {
      name: "navbar-storage", // unique name
      getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    },
  ),
);
