
import { useContext } from "react"
import "./desktop.css"
import { DesktopIcon } from "../icons/DesktopIcon"
import { WallpaperContext } from "$/context/wallpaper/WallpaperContext"
import { WindowContainer } from "../windows/WindowContainer"

function Desktop() {

    const wallpaperContext = useContext(WallpaperContext)

    if (!wallpaperContext) throw new Error("No wallpaper context setted");

    const { wallpaper } = wallpaperContext;

    

    return <div className="desktop" style={wallpaper.type ? {
        backgroundImage: "url(" + wallpaper.path + ")",
    } : {backgroundColor: wallpaper.path}}>
        
        <div className="app-grid">
            <DesktopIcon title="Wallpapers"/>
        </div>

        <WindowContainer/>
    </div>
}

export default Desktop