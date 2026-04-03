
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./window.css"
import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";
import { WindowContext } from "$/context/window/WindowContext";
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";

function Window({
    id,
    title,
    icon,
    onMinimize = () => {},
    onMaximize = () => {},
    onOpen = () => {},
    onClose = () => {},
    defaultCoords = {x: "50%", y: "50%"},
    defaultSize = {x: 0, y: 0},
    children,
    className = "",
    cantMinimize,
    cantMaximize,
    cantClose,
    canResize
}: UniqueWindowInstance & {className?: string}) {

    const windowContext = useContext(WindowContext);

    if (!windowContext) throw new Error("No window context!");

    const { windows, closeWindow } = windowContext;

    const [opened, setOpened] = useState<boolean>(false);

    let [coords, setCoords] = useState<CSSPoint>(defaultCoords);
    const [offset, setOffset] = useState<Point>({x:0, y:0})

    const [hover, setHover] = useState<boolean>(false);
    
    const windowRef = useRef<HTMLDivElement>(null);
    const windowInfo: UniqueWindowInfo = {id, title, icon, defaultCoords, defaultSize, cantClose, cantMaximize, cantMinimize, canResize, children}

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
            onOpen(windowInfo);
            setOpened(true);
        }

        return
    }, []);

    useLayoutEffect(() => {
        if (!windowRef.current) return;

        const rect = windowRef.current.getBoundingClientRect();

        const offset = windows.length * 20

        setCoords({
            x: (window.innerWidth - rect.width) / 2 + offset,
            y: (window.innerHeight - rect.height) / 2 + offset
        })
    }, [])
    

    return <div className={`window ${className}`} style={{
        left: coords.x,
        top: coords.y,
        width: defaultSize.x,
        height: defaultSize.y,
        resize: canResize ? "both" : "none",
    }} ref={windowRef}>

        <div className="window-bar" onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            setHover(true);
        }}>

            {icon && <img src={icon} height={24} width={24}/>}
            <p>{title}</p>

            <div className="window-buttons">
                
                {!cantMinimize && <button onClick={() => onMinimize(windowInfo)}>
                    -
                </button>}

                {!cantMaximize && <button onClick={() => onMaximize(windowInfo)}>
                    o
                </button>}
                
                {!cantClose && <button onClick={() => {
                    closeWindow(windowInfo)
                    onClose(windowInfo)
                }}>
                    X
                </button>}
            </div>
        </div>

        <div className="window-content">
            {children}
        </div>
    </div>
}

export default Window;