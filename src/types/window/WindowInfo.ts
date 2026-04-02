import type { ReactNode } from "react";
import type { AppInfo } from "../AppInfo";
import type { CSSPoint } from "../CSSPoint";


export interface WindowInfo extends AppInfo {
    children?: ReactNode;
    defaultCoords?: CSSPoint;
    defaultSize?: CSSPoint;
    cantMinimize?: boolean;
    cantMaximize?: boolean;
    cantClose?: boolean;
    canResize?: boolean;
}

export interface UniqueWindowInfo extends WindowInfo {
    id: number;
}