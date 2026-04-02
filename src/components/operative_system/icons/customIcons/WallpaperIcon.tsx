import { WallpaperApp } from "$/apps/wallpaper/WallpaperApp";
import { DesktopIcon } from "../DesktopIcon";


export function WallpaperIcon({ onChangeWallpaper }: {onChangeWallpaper?: (wallpaperPath: string) => void}) {

    return <DesktopIcon title="Wallpapers">
        <WallpaperApp onChangeWallpaper={onChangeWallpaper}/>
    </DesktopIcon>
}