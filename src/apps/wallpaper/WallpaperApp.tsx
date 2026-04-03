import { WallpaperContext } from "$/context/wallpaper/WallpaperContext"
import { useContext, useRef, useState } from "react"
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
    
    function saveWallpaper(file: string) {

        let newWallpaper: WallpaperInfo;

        if (file.startsWith('#')) {
            newWallpaper = {type: actualWallpaper.type, path: file};
        }
        else {
            newWallpaper = {type: actualWallpaper.type, path: `wallpapers/${file}`};
        }
        
        changeWallpaper(newWallpaper);
        setActualWallpaper(newWallpaper);
        onChangeWallpaper && onChangeWallpaper(file);
    }

    const colorRef = useRef<HTMLInputElement>(null);
    
    return <div className="wallpapers-app">

        <div className="wallpaper-type">
            <label htmlFor="wallpaper-type-selector">Wallpaper type:</label>
            <select name="wallpaper-type-selector" id="wallpaper-type-selector"
                onChange={(e) => {
                    setActualWallpaper({type: e.currentTarget.value as WallpaperType, path: wallpaper.path})
                    console.log(e.currentTarget.value)
                }}
            >
                <option value="image">Image</option>
                <option value="color">Color</option>
            </select>
        </div>

        {actualWallpaper.type === "image" ?
            <div className="wallpapers-container">
                {imageWallpapers.map(file => {
                    return <div className="wallpapers-container-item"
                        onClick={() => saveWallpaper(file)}
                    >
                        <img className="default-wallpaper" src={`wallpapers/${file}`}/>
                        <p>{file}</p>
                    </div>
                })}
            </div> :
            <>
                <label htmlFor="colorInput">Color:</label>
                <input type="color" id="colorInput" ref={colorRef} />
                <button onClick={() => {
                    if (colorRef.current?.value) saveWallpaper(colorRef.current?.value)
                }}>
                    Save color
                </button>
            </>
        }
    </div>
}