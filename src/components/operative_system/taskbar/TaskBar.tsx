import { useContext } from "react"
import "./taskbar.css"
import { WindowContext } from "$/context/window/WindowContext"
import { TaskBarIcon } from "../icons/TaskBarIcon";

export function TaskBar() {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) {
        console.log("no context")
        return
    };

    return <div className="taskbar">
        <div className="taskbar-apps">
            {windowsContext.windows.map(window => {
                return <TaskBarIcon key={window.id} icon={window.icon}/>
            })}
        </div>
        <div className="os-info">
            <p id="userTime">
                {new Date().toLocaleDateString()}
            </p>
        </div>
    </div>
}