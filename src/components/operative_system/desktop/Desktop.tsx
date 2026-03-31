import { MemoryManager } from "$/core/MemoryManager"
import { useState } from "react"
import "./desktop.css"
import { DesktopIcon } from "../icons/DesktopIcon"

function Desktop() {

    let [wallpaper, setWallpaper] = useState<string>(MemoryManager.get("wallpaper"))
    console.log("Loaded wallpaper: ", wallpaper)

    async function verifyWallpaper() {
        while (true) {
            const newWallpaper: string = MemoryManager.get("wallpaper")

            if (newWallpaper != wallpaper) {
                setWallpaper(newWallpaper);
            }
        }
    }

    verifyWallpaper()

    return <div className="desktop" style={{
        backgroundImage: "url(" + wallpaper + ")",
    }}>
        
        <div className="app-grid">
            <DesktopIcon title="Hola"/>
            <DesktopIcon title="Adios"/>
        </div>
    </div>
}

export default Desktop