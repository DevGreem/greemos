import { WindowContext } from "$/context/window/WindowContext";
import { useContext } from "react";
import Window from "./Window";
import { WelcomeScreen } from "../../../apps/welcomeScreen/WelcomeScreen";


export function WindowContainer() {

    const windowsContext = useContext(WindowContext);
    
    if (!windowsContext) throw new Error("Windows context not found")
    
    const { showWelcomeScreen, windows } = windowsContext;
    
    return <div className="windows-container">

        {showWelcomeScreen && <WelcomeScreen/>}

        {windows.map((value) => {
            return <Window
                key={value.id}
                {...value}
            >
            </Window>
        })}
    </div>
}