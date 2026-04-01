import type { WindowInfo } from "$/types/WindowInfo"
import { createContext } from "react";


type WindowContextType = {
    windows: WindowInfo[];
    openWindow: (params: WindowInfo) => void;
    closeWindow: (id: WindowInfo) => void;
}

export const WindowContext = createContext<WindowContextType|undefined>(undefined);