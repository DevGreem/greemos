import type { UniqueWindowInfo, WindowInfo} from "$/types/window/WindowInfo";
import { useState, type ReactNode } from "react";
import { WindowsContext } from "./WindowsContext";
import { MemoryManager } from "$/core/MemoryManager";


export function WindowsProvider({ children }: { children: ReactNode }) {
    const [activeWindowId, setActiveWindowId] = useState(-1);
    const [windows, setWindows] = useState<UniqueWindowInfo[]>([]);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(MemoryManager.get("welcome-screen") == "true")

    const openWindow = (window: WindowInfo) => setWindows(previous => [...previous, { id: Date.now(), ...window}])
    const closeWindow = (window: UniqueWindowInfo) => setWindows(previous => previous.filter(w => w.id !== window.id))


    function setReadedWelcomeScreen() {
        MemoryManager.set("welcome-screen", false);
        setShowWelcomeScreen(false);
    }

    function bringToFront(id: number) {
        setWindows(windows => {
            const nonFocusedWindows = windows.filter(window => window.id != id);

            const target = windows.find(window => window.id == id);

            if (!target) return windows;

            return [
                ...nonFocusedWindows.map((window, index) => ({
                    ...window,
                    style: { ...window.style, zIndex: index+1 }
                })),
                {
                    ...target,
                    style: {...target.style, zIndex: nonFocusedWindows.length+1}
                }
            ]
        })

        setActiveWindowId(id);
    }

    return <WindowsContext.Provider value={{
        windows,
        openWindow,
        closeWindow,
        showWelcomeScreen,
        setReadedWelcomeScreen,
        activeWindowId,
        bringToFront
    }}>
        {children}
    </WindowsContext.Provider>
}