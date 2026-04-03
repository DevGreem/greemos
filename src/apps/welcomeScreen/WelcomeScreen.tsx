import Window from "$/components/operative_system/windows/Window";
import { WindowContext } from "$/context/window/WindowContext";
import { useContext } from "react";
import { WelcomeScreenContent } from "./WelcomeScreenContent";


export function WelcomeScreen() {

    const windowsContext = useContext(WindowContext);

    if (!windowsContext) return;

    const { setReadedWelcomeScreen } = windowsContext

    return <Window
        id={Date.now()}
        title='Welcome to <span style="color: green">GreemOS!</span>'
        defaultCoords={{x: "50%", y: "50%"}}
        onClose={() => setReadedWelcomeScreen()}
        defaultSize={{x: 500, y: 500}}
        cantMinimize
        cantMaximize
        className="rounded-window"
    >
        <WelcomeScreenContent/>
    </Window>
}