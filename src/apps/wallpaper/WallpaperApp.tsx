import { WallpaperContext } from "$/context/wallpaper/WallpaperContext"
import { useContext, useState } from "react"
import "./wallpaperapp.css"
import type { WallpaperType } from "$/types/WallpaperType";
import type { WallpaperInfo } from "$/types/WallpaperInfo";

export function WallpaperApp({ onChangeWallpaper }: {onChangeWallpaper?: (wallpaperPath: string) => void}) {

    const wallpaperContext = useContext(WallpaperContext);

    if (!wallpaperContext) throw new Error("No wallpapers");

    const { wallpaper, changeWallpaper } = wallpaperContext;
    const [actualWallpaper, setActualWallpaper] = useState<WallpaperInfo>(wallpaper)

    const imageWallpapers = [
        "galactic.jpg",
        "equipo_flow.jpg"
    ]

    console.log("wallpapar images: ", imageWallpapers)
    
    return <div className="wallpapers-app" style={{}}>

        <div className="wallpaper-type">
            <label htmlFor="wallpaper-type-selector">Wallpaper type:</label>
            <select name="wallpaper-type-selector" id="wallpaper-type-selector"
                onSelect={(e) => setActualWallpaper({type: e.currentTarget.value as WallpaperType, path: wallpaper.path})}
            >
                <option value="image">Image</option>
                <option value="color">Color</option>
            </select>
        </div>

        {wallpaper.type === "image" ?
            <div className="wallpapers-container">
                {imageWallpapers.map(file => {
                    return <div className="wallpapers-container-item"
                        onClick={() => {
                            changeWallpaper({type: actualWallpaper.type, path: file});
                            
                            onChangeWallpaper && onChangeWallpaper(file);
                        }}
                    >
                        <img className="default-wallpaper" src={`wallpapers/${file}`}/>
                        <p>{file}</p>
                    </div>
                })}
            </div> :
            <>
                <label htmlFor="colorInput">Color:</label>
                <input type="color" id="colorInput" />
                <button>Save color</button>
            </>
        }
    </div>
}