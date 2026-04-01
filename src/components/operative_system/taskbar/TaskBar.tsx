import { useContext, type ReactNode } from "react"
import "./taskbar.css"
import { WindowContext } from "$/context/window/WindowContext"
import { TaskBarIcon } from "../icons/TaskBarIcon";

export function TaskBar({ children }: { children?: ReactNode}) {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) {
        console.log("no context")
        return
    };

    return <div className="taskbar">
        <div className="taskbar-apps">
            {children}
            {windowsContext.windows.map(window => {
                return <TaskBarIcon icon={window.icon}/>
            })}
        </div>
        <div className="os-info">
            <p id="userTime">
                {new Date().toLocaleDateString()}
            </p>
        </div>
    </div>
}