import { MemoryManager } from "$/core/MemoryManager"
import { useState } from "react"
import "./desktop.css"
import { DesktopIcon } from "../icons/DesktopIcon"
import type { WindowInfo } from "$/types/WindowInfo"

function Desktop({ onOpenWindow, onCloseWindow }: { onOpenWindow?: (window: WindowInfo) => void, onCloseWindow?: (window: WindowInfo) => void }) {

    let [wallpaper, setWallpaper] = useState<string>(MemoryManager.get("wallpaper"))
    console.log("Loaded wallpaper: ", wallpaper)
    setWallpaper

    return <div className="desktop" style={{
        backgroundImage: "url(" + wallpaper + ")",
    }}>
        
        <div className="app-grid">
            <DesktopIcon title="Wallpapers" onOpenWindow={onOpenWindow} onCloseWindow={onCloseWindow}/>
        </div>
    </div>
}

export default Desktop