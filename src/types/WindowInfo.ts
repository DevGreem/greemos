import type { ReactNode } from "react";
import type { AppInfo } from "./AppInfo";


export interface WindowInfo extends AppInfo {
    content?: ReactNode;
    onOpen?: (window: WindowInfo) => void;
    onClose?: (window: WindowInfo) => void;
}

export interface UniqueWindowInfo extends WindowInfo {
    id: number;
}