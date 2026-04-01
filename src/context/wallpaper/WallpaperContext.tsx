import type { WallpaperInfo } from "$/types/WallpaperInfo"
import { createContext } from "react"


type WallpaperContextType =  {
    wallpaper: WallpaperInfo
    changeWallpaper: (newWallpaper: WallpaperInfo) => void;
}

export const WallpaperContext = createContext<WallpaperContextType|undefined>(undefined);