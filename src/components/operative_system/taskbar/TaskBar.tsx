import { useContext, useEffect, useState } from "react"
import "./taskbar.css"
import { WindowContext } from "$/context/window/WindowContext"
import { TaskBarIcon } from "../icons/TaskBarIcon";

export function TaskBar() {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) {
        console.log("no context")
        return
    };

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timeUpdater = setInterval(() => setTime(new Date()), 1000);

        return () => clearInterval(timeUpdater);
    }, [])

    return <div className="taskbar">
        <div className="taskbar-apps">
            {windowsContext.windows.map(window => {
                return <TaskBarIcon key={window.id} icon={window.icon}/>
            })}
        </div>
        <div className="os-info">
            <p id="userTime">
                {time.toLocaleString()}
            </p>
        </div>
    </div>
}