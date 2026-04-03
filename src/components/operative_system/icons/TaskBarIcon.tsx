import { memo } from "react"
import "./taskbaricon.css"
import type { UniqueAppInfo } from "$/types/AppInfo";

function TaskBarIcon(app: UniqueAppInfo) {

    return <div className="taskbar-icon">
        <img src={app.icon ?? "react.svg"} alt="" />
    </div>
}

export default memo(TaskBarIcon);