import type { UniqueWindowInfo, WindowInfo} from "$/types/window/WindowInfo"
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";
import { createContext, useContext } from "react";


type WindowsContextType = {
    activeWindowId: number;
    windows: UniqueWindowInstance[];
    openWindow(params: WindowInfo): void;
    closeWindow(id: UniqueWindowInfo): void;
    updateWindow(id: number, updater: (window: UniqueWindowInfo) => UniqueWindowInfo): void;
    showWelcomeScreen: boolean;
    setReadedWelcomeScreen(): void;
    bringToFront(id: number): void;
    toggleMinimize(id: number): void;
}

export const WindowsContext = createContext<WindowsContextType|undefined>(undefined);

export function useWindows() {
    const context = useContext(WindowsContext);

    if (!context) throw new Error("No windows context!");

    return context;
}