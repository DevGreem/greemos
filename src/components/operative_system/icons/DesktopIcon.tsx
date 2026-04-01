import type { AppInfo } from "$/types/AppInfo"
import { useContext, type MouseEventHandler } from "react"
import "./desktopicon.css"
import type { WindowInfo } from "$/types/WindowInfo";
import Window from "../windows/Window";
import { WindowContext } from "$/context/window/WindowContext";


export function DesktopIcon({
    title,
    icon = "react.svg",
    onClick = undefined,
    onOpenWindow = undefined,
    onCloseWindow = undefined
}: AppInfo & {onClick?: MouseEventHandler<HTMLDivElement>, onOpenWindow?: (window: WindowInfo) => void, onCloseWindow?: (window: WindowInfo) => void}) {

    //const [windows, setWindows] = useState<WindowInfo[]>([]);
    const windowsContext = useContext(WindowContext);

    if (!windowsContext) throw new Error("Windows context not found")

    const { windows, openWindow } = windowsContext;

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

        {windows.map((value) => {
            return <Window
                key={value.id}
                id={value.id}
                title={value.title}
                icon={value.icon}
                onOpen={onOpenWindow}
                onClose={onCloseWindow}/>
        })}
    </>
}