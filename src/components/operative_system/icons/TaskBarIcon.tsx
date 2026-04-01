import "./taskbaricon.css"

export function TaskBarIcon({icon = "react.svg"}: {icon?: string}) {

    return <div className="taskbar-icon">
        <img src={icon} alt="" />
    </div>
}