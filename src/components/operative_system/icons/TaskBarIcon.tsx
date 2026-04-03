import { memo } from "react"
import "./taskbaricon.css"
import type { UniqueAppInfo } from "$/types/AppInfo";
import { useWindows } from "$/context/window/WindowsContext";

function TaskBarIcon(app: UniqueAppInfo) {

    const { bringToFront, toggleMinimize } = useWindows();

    return <div
        className="taskbar-icon"
        onClick={() => {
            bringToFront(app.id);
            toggleMinimize(app.id);
        }}
    >
        <img
            src={app.icon ?? "react.svg"}
            alt=""
        />
    </div>
}

export default memo(TaskBarIcon);