import type { UniqueWindowInfo, WindowInfo} from "$/types/window/WindowInfo";
import { useState, type ReactNode } from "react";
import { WindowsContext } from "./WindowsContext";
import { MemoryManager } from "$/core/MemoryManager";


export function WindowsProvider({ children }: { children: ReactNode }) {
    const [activeWindowId, setActiveWindowId] = useState(-1);
    const [windows, setWindows] = useState<UniqueWindowInfo[]>([]);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(MemoryManager.get("welcome-screen") == "true")
    const [actIndex, setActIndex] = useState(1);

    function updateIndex(toExecute: (index: number) => void) {
        const newIndex = actIndex+1;
        setActIndex(newIndex);
        toExecute(newIndex);
    }

    function setReadedWelcomeScreen() {
        MemoryManager.set("welcome-screen", false);
        setShowWelcomeScreen(false);
    }

    function openWindow(window: WindowInfo) {
        
        updateIndex((index) => {
            setWindows(windows => [
                ...windows,
                {
                    id: Date.now(),
                    ...window,
                    style: {
                        ...window.style,
                        zIndex: index
                    }
                }
            ])
        })
    }

    const closeWindow = (window: UniqueWindowInfo) => setWindows(previous => previous.filter(w => w.id !== window.id))

    function bringToFront(id: number) {

        updateIndex((index) => {
            setWindows(windows =>
                windows.map((window) => {

                    if (window.id !== id) {
                        return window
                    }

                    return {...window, style: { ...window.style, zIndex: index}}
                })
            )
        })
        
        // setWindows(windows => {
        //     const nonFocusedWindows = windows.filter(window => window.id != id);

        //     const target = windows.find(window => window.id == id);

        //     if (!target) return windows;

        //     return [
        //         ...nonFocusedWindows.map((window, index) => ({
        //             ...window,
        //             style: { ...window.style, zIndex: index+1 }
        //         })),
        //         {
        //             ...target,
        //             style: {...target.style, zIndex: nonFocusedWindows.length+1}
        //         }
        //     ]
        // })

        setActiveWindowId(id);
    }

    function updateWindow(id: number, updater: (window: UniqueWindowInfo) => UniqueWindowInfo) {
        setWindows(previous => previous.map(window => window.id == id ? updater(window) : window))
    }

    return <WindowsContext.Provider value={{
        windows,
        openWindow,
        closeWindow,
        showWelcomeScreen,
        setReadedWelcomeScreen,
        activeWindowId,
        bringToFront,
        updateWindow
    }}>
        {children}
    </WindowsContext.Provider>
}