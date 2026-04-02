import type { UniqueWindowInfo, WindowInfo} from "$/types/window/WindowInfo";
import { useState, type ReactNode } from "react";
import { WindowContext } from "./WindowContext";
import { MemoryManager } from "$/core/MemoryManager";


export function WindowProvider({ children }: { children: ReactNode }) {
    const [windows, setWindows] = useState<UniqueWindowInfo[]>([]);
    const [showWelcomeScreen, setShowWelcomeScreen] = useState<boolean>(MemoryManager.get("welcome-screen") == "true")

    const openWindow = (window: WindowInfo) => setWindows(previous => [...previous, { id: Date.now(), ...window}])
    const closeWindow = (window: UniqueWindowInfo) => setWindows(previous => previous.filter(w => w.id !== window.id))

    function setReadedWelcomeScreen() {
        MemoryManager.set("welcome-screen", false);
        setShowWelcomeScreen(false);
    }

    return <WindowContext.Provider value={{ windows, openWindow, closeWindow, showWelcomeScreen, setReadedWelcomeScreen }}>
        {children}
    </WindowContext.Provider>
}