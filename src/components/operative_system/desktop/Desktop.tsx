
import { useContext } from "react"
import "./desktop.css"
import { WallpaperContext } from "$/context/wallpaper/WallpaperContext"
import { WindowContainer } from "../windows/WindowContainer"
import { WallpaperIcon } from "../icons/customIcons/WallpaperIcon"

function Desktop() {

    const wallpaperContext = useContext(WallpaperContext)

    if (!wallpaperContext) throw new Error("No wallpaper context setted");

    const { wallpaper } = wallpaperContext;

    

    return <div className="desktop" style={wallpaper.type == "image" ? {
        backgroundImage: "url(" + wallpaper.path + ")",
    } : {backgroundColor: wallpaper.path}}>
        
        <div className="app-grid">
            <WallpaperIcon/>
        </div>

        <WindowContainer/>
    </div>
}

export default Desktop