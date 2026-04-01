import { MemoryManager } from "$/core/MemoryManager";
import type { WallpaperInfo } from "$/types/WallpaperInfo";
import { useState, type ReactNode } from "react";
import { WallpaperContext } from "./WallpaperContext";


export function WallpaperProvider({ children }: { children: ReactNode }) {

    const [wallpaper, setWallpaper] = useState<WallpaperInfo>(MemoryManager.getDict('wallpaper'))

    const changeWallpaper = (newWallpaper: WallpaperInfo) => {
        setWallpaper(newWallpaper);
        MemoryManager.setDict("wallpaper", newWallpaper);
    }
    console.log(wallpaper);
    
    return <WallpaperContext.Provider value={{ wallpaper, changeWallpaper }}>
        {children}
    </WallpaperContext.Provider>
}