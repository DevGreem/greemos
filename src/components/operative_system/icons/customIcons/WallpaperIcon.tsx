import { WallpaperApp } from "$/apps/wallpaper/WallpaperApp";
import { memo } from "react";
import DesktopIcon from "../DesktopIcon";


export function WallpaperIcon({ onChangeWallpaper }: {onChangeWallpaper?: (wallpaperPath: string) => void}) {

    return <DesktopIcon
        title="Wallpapers"
        canResize
        defaultSize={{x: 700, y: 700}}
        
    >
        <WallpaperApp onChangeWallpaper={onChangeWallpaper}/>
    </DesktopIcon>
}

export default memo(WallpaperIcon);