
import { useEffect, useState, type ReactNode } from "react";
import "./window.css"
import type { WindowInfo } from "$/types/WindowInfo";
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";

function Window({
    id = 0,
    title,
    icon = "react.svg",
    onOpen = () => {},
    onClose = () => {},
    defaultCoords = {x: "50%", y: "50%"},
    children
}: WindowInfo & {defaultCoords: CSSPoint, onOpen?: (window: WindowInfo) => void, onClose?: <T>(...params: T[]) => void, children?: ReactNode}) {

    const [opened, setOpened] = useState<boolean>(false);

    let [coords, setCoords] = useState<CSSPoint>(defaultCoords);
    const [offset, setOffset] = useState<Point>({x:0, y:0})

    const [hover, setHover] = useState<boolean>(false);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            
            if (!hover) {
                return;
            }

            setCoords({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            })
        };

        window.addEventListener("mousemove", handleMove)
        
        return () => window.removeEventListener("mousemove", handleMove);
    }, [hover, offset])

    if (!opened) {
        onOpen({id, title, icon});
        setOpened(true);
    }

    return <div className="window" style={{
        left: coords.x,
        top: coords.y
    }}>

        <div className="window-bar" onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            setHover(true);
        }} onMouseUp={() => setHover(false)}>

            <img src={icon}/>
            <p>{title}</p>

            <div className="buttons">
                <button>-</button>
                <button>o</button>
                <button onClick={() => onClose()}>X</button>
            </div>
        </div>

        <div className="window-content">
            {children}
        </div>
    </div>
}

export default Window;