import { useContext, type MouseEventHandler } from "react"
import "./desktopicon.css"
import { WindowContext } from "$/context/window/WindowContext";
import type { WindowInfo } from "$/types/window/WindowInfo";


export function DesktopIcon({
    title,
    icon = "react.svg",
    onClick,
    children,
    canResize,
    cantMinimize,
    cantClose,
    cantMaximize,
    defaultCoords,
    defaultSize
}: WindowInfo & {onClick?: MouseEventHandler<HTMLDivElement>}) {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) throw new Error("Windows context not found")

    const { openWindow } = windowsContext;

    if (!onClick) {
        onClick = () => openWindow({
            title,
            icon,
            children,
            canResize,
            cantClose,
            cantMaximize,
            cantMinimize,
            defaultCoords,
            defaultSize
        })
    }

    return <>
        <div className="desktop-icon" onClick={onClick}>
            <img src={icon} alt="" />
            <p>{title}</p>
        </div>
    </>
}