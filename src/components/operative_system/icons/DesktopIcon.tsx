import type { AppInfo } from "$/types/AppInfo"
import { useContext, type MouseEventHandler, type ReactNode } from "react"
import "./desktopicon.css"
import { WindowContext } from "$/context/window/WindowContext";


export function DesktopIcon({
    title,
    icon = "react.svg",
    onClick = undefined,
    children
}: AppInfo & {children?: ReactNode, onClick?: MouseEventHandler<HTMLDivElement>}) {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) throw new Error("Windows context not found")

    const { openWindow } = windowsContext;

    if (!onClick) {
        onClick = () => openWindow({
            title: title,
            icon: icon,
            content: children,
        })
    }

    return <>
        <div className="desktop-icon" onClick={onClick}>
            <img src={icon} alt="" />
            <p>{title}</p>
        </div>
    </>
}