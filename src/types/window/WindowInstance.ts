import type { HTMLAttributes } from "react";
import type { WindowButtonsEvents } from "./WindowButtonEvents";
import type { UniqueWindowInfo, WindowInfo } from "./WindowInfo";

export type WindowInstance = WindowInfo & WindowButtonsEvents & { readonly childrenInfo?: HTMLAttributes<HTMLDivElement>}
export type UniqueWindowInstance = UniqueWindowInfo & WindowButtonsEvents & { readonly childrenInfo?: HTMLAttributes<HTMLDivElement>}