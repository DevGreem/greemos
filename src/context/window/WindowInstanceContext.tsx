import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import { createContext, useContext } from "react";

interface WindowInstanceContextType {
    window: UniqueWindowInfo;
    updateWindow: (updater: (window: UniqueWindowInfo) => UniqueWindowInfo) => void;
}


export const WindowInstanceContext = createContext<WindowInstanceContextType|undefined>(undefined)

export function useWindowData() {
    const context = useContext(WindowInstanceContext);
    
    if (!context) throw new Error("No window data!");

    return context;
} 