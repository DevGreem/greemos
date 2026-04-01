import type { WindowInfo } from "$/types/WindowInfo";
import { useState, type ReactNode } from "react";
import { WindowContext } from "./WindowContext";


export function WindowProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<WindowInfo[]>([]);

    const openWindow = (window: WindowInfo) => setWindows(previous => [...previous, window])
    const closeWindow = (window: WindowInfo) => setWindows(previous => previous.filter(w => w.id !== window.id))

    return <WindowContext.Provider value={{ windows, openWindow, closeWindow }}>
        {children}
    </WindowContext.Provider>
}