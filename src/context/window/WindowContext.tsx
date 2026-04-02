import type { UniqueWindowInfo, WindowInfo} from "$/types/window/WindowInfo"
import type { UniqueWindowInstance } from "$/types/window/WindowInstance";
import { createContext } from "react";


type WindowContextType = {
    windows: UniqueWindowInstance[];
    openWindow: (params: WindowInfo) => void;
    closeWindow: (id: UniqueWindowInfo) => void;
    showWelcomeScreen: boolean;
    setReadedWelcomeScreen: () => void;
}

export const WindowContext = createContext<WindowContextType|undefined>(undefined);