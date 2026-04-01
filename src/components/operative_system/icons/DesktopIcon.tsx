import type { AppInfo } from "$/types/AppInfo"
import { useContext, type MouseEventHandler } from "react"
import "./desktopicon.css"
import { WindowContext } from "$/context/window/WindowContext";


export function DesktopIcon({
    title,
    icon = "react.svg",
    onClick = undefined,
}: AppInfo & {onClick?: MouseEventHandler<HTMLDivElement>}) {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) throw new Error("Windows context not found")

    const { openWindow } = windowsContext;

    if (!onClick) {
        onClick = () => openWindow({
            id: Date.now(),
            title: title,
            icon: icon
        })
    }

    return <>
        <div className="desktop-icon" onClick={onClick}>
            <img src={icon} alt="" />
            <p>{title}</p>
        </div>
    </>
}