import { memo, type FC, type MouseEventHandler } from "react"
import "./desktopicon.css"
import { useWindows } from "$/context/window/WindowsContext";
import type { WindowInfo } from "$/types/window/WindowInfo";


type Props = WindowInfo & {onClick?: MouseEventHandler<HTMLDivElement>}

const DesktopIcon: FC<Props> = ({onClick, ...windowInfo}: Props) => {

    const { openWindow } = useWindows();

    if (!windowInfo.icon) {
        windowInfo.icon = "react.svg";
    }
 
    if (!onClick) {
        onClick = () => openWindow(windowInfo)
    }

    return <>
        <div className="desktop-icon" onClick={onClick}>
            <img src={windowInfo.icon} alt="" />
            <p>{windowInfo.title}</p>
        </div>
    </>
}

export default memo(DesktopIcon);