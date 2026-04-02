
import { useContext, useEffect, useState, type ReactNode } from "react";
import "./window.css"
import type { UniqueWindowInfo } from "$/types/WindowInfo";
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";
import { WindowContext } from "$/context/window/WindowContext";

function Window({
    id,
    title,
    icon = "react.svg",
    onOpen = () => {},
    onClose = () => {},
    defaultCoords = {x: "50%", y: "50%"},
    children
}: UniqueWindowInfo & {defaultCoords?: CSSPoint, defaultSize?: CSSPoint, onOpen?: (window: UniqueWindowInfo) => void, onClose?: (window: UniqueWindowInfo) => void, children?: ReactNode}) {

    const windowContext = useContext(WindowContext);

    if (!windowContext) throw new Error("No window context!");

    const { closeWindow } = windowContext;

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
        window.addEventListener("mouseup", () => setHover(false))
        
        return () => window.removeEventListener("mousemove", handleMove);
    }, [hover, offset])

    useEffect(() => {
        if (!opened) {
            onOpen({id, title, icon, onOpen, onClose});
            setOpened(true);
        }

        return
    }, [])

    return <div className="window" style={{
        left: coords.x,
        top: coords.y
    }}
        onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const over = 2;

            if (e.clientX >= rect.x-over || e.clientX <= rect.x+over) {
                
            }
        }}
    >

        <div className="window-bar" onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            setHover(true);
        }}>

            <img src={icon} height={24} width={24}/>
            <p>{title}</p>

            <div className="buttons">
                <button>-</button>
                <button>o</button>
                <button onClick={() => {

                    const windowInfo: UniqueWindowInfo = {id: id, title: title, icon: icon}
                    closeWindow(windowInfo)
                    onClose(windowInfo)
                }}>X</button>
            </div>
        </div>

        <div className="window-content">
            {children}
        </div>
    </div>
}

export default Window;