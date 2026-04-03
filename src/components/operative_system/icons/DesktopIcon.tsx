import { memo, useContext, type FC, type MouseEventHandler } from "react"
import "./desktopicon.css"
import { WindowContext } from "$/context/window/WindowContext";
import type { WindowInfo } from "$/types/window/WindowInfo";


type Props = WindowInfo & {onClick?: MouseEventHandler<HTMLDivElement>}

const DesktopIcon: FC<Props> = ({onClick, ...windowInfo}: Props) => {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) throw new Error("Windows context not found")

    const { openWindow } = windowsContext;

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