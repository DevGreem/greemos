import { memo } from "react"
import "./taskbaricon.css"

function TaskBarIcon({icon = "react.svg"}: {icon?: string}) {

    return <div className="taskbar-icon">
        <img src={icon} alt="" />
    </div>
}

export default memo(TaskBarIcon);