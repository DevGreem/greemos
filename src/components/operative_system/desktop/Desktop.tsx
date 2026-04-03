import "./desktop.css"
import { useWallpaper } from "$/context/wallpaper/WallpaperContext"
import { WindowContainer } from "../windows/WindowContainer"
import { WallpaperIcon } from "../icons/customIcons/WallpaperIcon"

function Desktop() {

    const { wallpaper } = useWallpaper()

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