import type { UniqueWindowInfo } from "./WindowInfo";


export interface WindowButtonsEvents {
    onOpen?: (window: UniqueWindowInfo) => void;
    onMinimize?: (window: UniqueWindowInfo) => void;
    onMaximize?: (window: UniqueWindowInfo) => void;
    onClose?: (window: UniqueWindowInfo) => void;
}