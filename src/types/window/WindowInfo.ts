import type { CSSProperties, ReactNode } from "react";
import type { AppInfo } from "../AppInfo";
import type { CSSPoint } from "../CSSPoint";


export interface WindowInfo extends AppInfo {
    children?: ReactNode;
    defaultCoords?: CSSPoint;
    defaultSize?: CSSPoint;
    cantMinimize?: boolean;
    minimized?: boolean;
    cantMaximize?: boolean;
    maximized?: boolean;
    cantClose?: boolean;
    canResize?: boolean;
    style?: CSSProperties;
    className?: string;
}

export interface UniqueWindowInfo extends WindowInfo {
    id: number;
}