import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import { createContext, useContext } from "react";


export const WindowInstanceContext = createContext<UniqueWindowInfo|undefined>(undefined)

export function useWindowData() {
    const context = useContext(WindowInstanceContext);
    
    if (!context) throw new Error("No window data!");

    return context;
} 