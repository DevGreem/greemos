import type { AppInfo } from "./AppInfo";


export interface WindowInfo extends AppInfo {
    id: number,
    onOpen?: (window: WindowInfo) => void;
    onClose?: (window: WindowInfo) => void;
}