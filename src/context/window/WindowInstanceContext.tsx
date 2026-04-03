import type { UniqueWindowInfo } from "$/types/window/WindowInfo";
import { createContext, useContext, type CSSProperties, type Dispatch, type SetStateAction } from "react";

interface WindowInstanceContextType {
    window: UniqueWindowInfo;
    setWindowInfo: Dispatch<SetStateAction<UniqueWindowInfo>>;
    setContentStyle: (newStyle: CSSProperties) => void;
}


export const WindowInstanceContext = createContext<WindowInstanceContextType|undefined>(undefined)

export function useWindowData() {
    const context = useContext(WindowInstanceContext);
    
    if (!context) throw new Error("No window data!");

    return context;
} 