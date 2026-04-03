
import { useContext, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import "./window.css"
import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";
import { WindowContext } from "$/context/window/WindowContext";
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";
import { WindowInstanceContext } from "$/context/window/WindowInstanceContext";

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
    className = "",
    cantMinimize,
    cantMaximize,
    cantClose,
    canResize,
    style,
    children,
    childrenStyle,
    childrenClassName
}: UniqueWindowInstance) {

    const windowContext = useContext(WindowContext);

    if (!windowContext) throw new Error("No window context!");

    const { closeWindow } = windowContext;

    const [opened, setOpened] = useState<boolean>(false);
    const [offset, setOffset] = useState<Point>({x:0, y:0})

    const [hover, setHover] = useState<boolean>(false);
    
    const windowRef = useRef<HTMLDivElement>(null);
    const [windowInfo, setWindowInfo] = useState<UniqueWindowInfo>({
        id,
        title,
        icon,
        defaultCoords,
        defaultSize,
        cantClose,
        cantMaximize,
        cantMinimize,
        canResize,
        children,
        style,
        childrenStyle,
        childrenClassName,
    });

    const [coords, setCoords] = useState<CSSPoint>(windowInfo.defaultCoords || {x:"50%", y:"50%"});
    
    function setContentStyle(newStyle: CSSProperties) {
        setWindowInfo(previous => ({
            ...previous,
            childrenStyle: {...previous.childrenStyle, ...newStyle}
        }))
    }

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

        setCoords({
            x: (window.innerWidth - rect.width) / 2,
            y: (window.innerHeight - rect.height) / 2
        })
    }, [])
    

    return <div className={`window ${className}`} style={{
        left: coords.x,
        top: coords.y,
        width: windowInfo.defaultSize?.x  || 0,
        height: windowInfo.defaultSize?.y || 0,
        resize: windowInfo.canResize ? "both" : "none",
        ...windowInfo.style
    }}
        ref={windowRef}
    >

        <div className="window-bar" onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            setHover(true);
        }}>

            {icon && <img src={icon} height={24} width={24}/>}
            <p dangerouslySetInnerHTML={{__html: title}}/>

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

        <div className={`window-content ${windowInfo.childrenClassName || ""}`} style={{...windowInfo.childrenStyle}}>
            <WindowInstanceContext.Provider value={{ window: windowInfo, setWindowInfo, setContentStyle }}>
                {children}
            </WindowInstanceContext.Provider>
        </div>
    </div>
}

export default Window;