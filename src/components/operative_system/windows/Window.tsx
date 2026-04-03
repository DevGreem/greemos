
import { memo, useEffect, useLayoutEffect, useRef, useState, type FC } from "react";
import "./window.css"
import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import type { Point } from "$/types/Point";
import type { CSSPoint } from "$/types/CSSPoint";
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";
import { WindowInstanceContext } from "$/context/window/WindowInstanceContext";
import WindowContent from "./WindowContent";
import { useWindows } from "$/context/window/WindowsContext";

const Window: FC<UniqueWindowInstance> = (info: UniqueWindowInstance) => {

    const { bringToFront, closeWindow } = useWindows();

    const windowRef = useRef<HTMLDivElement>(null);
    const [windowInfo, setWindowInfo] = useState<UniqueWindowInfo>(info);

    const [opened, setOpened] = useState<boolean>(false);
    const [offset, setOffset] = useState<Point>({x:0, y:0})

    const [hover, setHover] = useState<boolean>(false);

    const [coords, setCoords] = useState<CSSPoint>(windowInfo.defaultCoords || {x:"50%", y:"50%"});

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

        const rect = windowRef.current.getBoundingClientRect();

        setCoords({
            x: (window.innerWidth - rect.width) / 2,
            y: (window.innerHeight - rect.height) / 2
        })
    }, [])

    function onFocus() {
        bringToFront(info.id)
    }
    

    return <div className={`window ${info.className}`} style={{
        left: coords.x,
        top: coords.y,
        width: windowInfo.defaultSize?.x || 0,
        height: windowInfo.defaultSize?.y || 0,
        resize: windowInfo.canResize ? "both" : "none",
        ...windowInfo.style
    }}
        ref={windowRef}
        onMouseDown={onFocus}
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
                
                {!info.cantMinimize && <button onClick={() => info.onMinimize?.(info)}>
                    -
                </button>}

                {!info.cantMaximize && <button onClick={() => info.onMaximize?.(info)}>
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

        <WindowInstanceContext.Provider value={{ window: info, setWindowInfo }}>
            <WindowContent {...info.childrenInfo}>
                {info.children}
            </WindowContent>
        </WindowInstanceContext.Provider>
    </div>
}

export default memo(Window);