import type { WindowButtonsEvents } from "./WindowButtonEvents";
import type { UniqueWindowInfo, WindowInfo } from "./WindowInfo";

export type WindowInstance = WindowInfo & WindowButtonsEvents
export type UniqueWindowInstance = UniqueWindowInfo & WindowButtonsEvents