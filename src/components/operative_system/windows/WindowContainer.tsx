import { WindowContext } from "$/context/window/WindowContext";
import { useContext } from "react";
import Window from "./Window";


export function WindowContainer() {

    const windowsContext = useContext(WindowContext);
    
    if (!windowsContext) throw new Error("Windows context not found")
    
    const { windows } = windowsContext;
    
    return <div className="windows-container">
        {windows.map((value) => {
            return <Window
                key={value.id}
                id={value.id}
                title={value.title}
                icon={value.icon}
                onOpen={value.onOpen}
                onClose={value.onClose}/>
        })}
    </div>
}