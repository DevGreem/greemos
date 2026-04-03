import Window from "../Window";
import { WindowContext } from "$/context/window/WindowContext";
import { useContext } from "react";


export function WelcomeScreen() {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) return;

    const { setReadedWelcomeScreen } = windowsContext

    return <Window
        id={Date.now()}
        title="Welcome!"
        defaultCoords={{x: "50%", y: "50%"}}
        onClose={() => setReadedWelcomeScreen()}
        defaultSize={{x: 500, y: 500}}
        cantMinimize
        cantMaximize
        className="rounded-window"
    >
        <div className="welcome-window">
            
        </div>
    </Window>
}