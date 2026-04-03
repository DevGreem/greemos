import type { WallpaperInfo } from "$/types/WallpaperInfo"
import { createContext, useContext } from "react"


type WallpaperContextType =  {
    wallpaper: WallpaperInfo
    changeWallpaper: (newWallpaper: WallpaperInfo) => void;
}

export const WallpaperContext = createContext<WallpaperContextType|undefined>(undefined);

export function useWallpaper() {
    const context = useContext(WallpaperContext);

    if (!context) throw new Error("No wallpaper context!");

    return context;
}