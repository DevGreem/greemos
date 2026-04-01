import { type ReactNode } from "react"
import "./taskbar.css"

export function TaskBar({ children }: { children?: ReactNode}) {

    return <div className="taskbar">
        <div className="taskbar-=">
            {children}
        </div>
        <div className="os-info">
            <p id="userTime">
                {new Date().toLocaleDateString()}
            </p>
        </div>
    </div>
}