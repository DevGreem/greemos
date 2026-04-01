import type { AppInfo } from "$/types/AppInfo"
import { useState, type MouseEventHandler } from "react"
import "./desktopicon.css"
import type { WindowInfo } from "$/types/WindowInfo";
import Window from "../windows/Window";


export function DesktopIcon({
    title,
    icon = "react.svg",
    onClick = undefined,
    onOpenWindow = undefined,
    onCloseWindow = undefined
}: AppInfo & {onClick?: MouseEventHandler<HTMLDivElement>, onOpenWindow?: (window: WindowInfo) => void, onCloseWindow?: (windowId: number) => void}) {

    const [windows, setWindows] = useState<WindowInfo[]>([]);

    function openDefaultWindow(): WindowInfo {

        const newWindow: WindowInfo = { id: Date.now(), title: title, icon: icon}
        setWindows(value => [...value, newWindow])

        return newWindow
    }

    function closeWindow(id: number) {
        setWindows(value => value.filter(window => window.id !== id))

        if (onCloseWindow) onCloseWindow(id);
    }

    if (!onClick) {
        onClick = () => openDefaultWindow()
    }

    return <>
        <div className="desktop-icon" onClick={onClick}>
            <img src={icon} alt="" />
            <p>{title}</p>
        </div>

        {windows.map((value) => {
            return <Window
                key={value.id}
                id={value.id}
                title={value.title}
                icon={value.icon}
                onOpen={onOpenWindow}
                onClose={() => closeWindow(value.id)}/>
        })}
    </>
}