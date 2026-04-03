
import { memo, useEffect, useLayoutEffect, useRef, useState, type FC } from "react";
import "./window.css"
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";
import { WindowInstanceContext } from "$/context/window/WindowInstanceContext";
import WindowContent from "./WindowContent";
import { useWindows } from "$/context/window/WindowsContext";
import type { UniqueWindowInfo } from "$/types/window/WindowInfo";

const Window: FC<UniqueWindowInstance> = (info: UniqueWindowInstance) => {

    const { bringToFront, closeWindow, updateWindow, toggleMinimize } = useWindows();

    const windowRef = useRef<HTMLDivElement>(null);

    const [opened, setOpened] = useState<boolean>(false);
    const [offset, setOffset] = useState<Point>({x:0, y:0})
    const [maximized, setMaximized] = useState(info.maximized);

    const [hover, setHover] = useState<boolean>(false);

    const [coords, setCoords] = useState<CSSPoint>(info.defaultCoords || {x:"50%", y:"50%"});

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            
            if (!hover || maximized) {
                return;
            }

            setCoords({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            })
        };

        const handleUp = () => setHover(false);

        window.addEventListener("mousemove", handleMove)
        window.addEventListener("mouseup", handleUp)
        
        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [hover, offset])

    useEffect(() => {
        if (!opened) {
            info.onOpen?.(info);
            setOpened(true);
        }

        return
    }, []);

    useLayoutEffect(() => {
        if (!windowRef.current) return;

        if (coords.x != "50%" && coords.y != "50%") return;

        const rect = windowRef.current.getBoundingClientRect();

        setCoords({
            x: (window.innerWidth - rect.width) / 2,
            y: (window.innerHeight - rect.height) / 2
        })
    }, [])
    
    if (info.minimized) return;

    return <div className={`window ${info.className}`} style={{
        left: maximized ? 0 : coords.x,
        top: maximized ? 0 : coords.y,
        width: maximized ? "100%" : info.defaultSize?.x || 0,
        height: maximized ? (window.innerHeight - 46) : info.defaultSize?.y || 0,
        resize: !maximized && info.canResize ? "both" : "none",
        overflow: maximized ? "hidden" : "scroll",
        ...info.style
    }}
        ref={windowRef}
        onMouseDown={() => bringToFront(info.id)}
    >

        <div className="window-bar" onMouseDown={(e) => {
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            })

            setHover(true);
        }}>

            {info.icon && <img src={info.icon} height={24} width={24}/>}
            <p dangerouslySetInnerHTML={{__html: info.title}}/>

            <div className="window-buttons">
                
                {!info.cantMinimize && <button onClick={() => {
                    toggleMinimize(info.id);
                    info.onMinimize?.(info);
                }}>
                    -
                </button>}

                {!info.cantMaximize && <button onClick={() => {
                    setMaximized(!maximized);
                    info.onMaximize?.(info)
                }}>
                    o
                </button>}
                
                {!info.cantClose && <button onClick={() => {
                    closeWindow(info)
                    info.onClose?.(info)
                }}>
                    X
                </button>}
            </div>
        </div>

        <WindowInstanceContext.Provider value={{
            window: info,
            updateWindow: (updater: (window: UniqueWindowInfo) => UniqueWindowInfo) => updateWindow(info.id, updater)
        }}>
            <WindowContent {...info.childrenInfo}>
                {info.children}
            </WindowContent>
        </WindowInstanceContext.Provider>
    </div>
}

export default memo(Window);