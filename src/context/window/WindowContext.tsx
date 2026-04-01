import type { UniqueWindowInfo, WindowInfo} from "$/types/WindowInfo"
import { createContext } from "react";


type WindowContextType = {
    windows: UniqueWindowInfo[];
    openWindow: (params: WindowInfo) => void;
    closeWindow: (id: UniqueWindowInfo) => void;
}

export const WindowContext = createContext<WindowContextType|undefined>(undefined);