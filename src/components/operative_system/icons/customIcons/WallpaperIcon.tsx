import WallpaperApp from "$/apps/wallpaper/WallpaperApp";
import { memo } from "react";
import DesktopIcon from "../DesktopIcon";


export function WallpaperIcon({ onChangeWallpaper }: {onChangeWallpaper?: (wallpaperPath: string) => void}) {

    return <DesktopIcon
        title="Wallpapers"
        canResize
        defaultSize={{x: "50%", y: "50%"}}
    >
        <WallpaperApp onChangeWallpaper={onChangeWallpaper}/>
    </DesktopIcon>
}

export default memo(WallpaperIcon);