import Window from "$/components/operative_system/windows/Window";
import { useWindows, } from "$/context/window/WindowsContext";
import { WelcomeScreenContent } from "./WelcomeScreenContent";


export function WelcomeScreen() {

    const { setReadedWelcomeScreen } = useWindows();

    return <Window
        id={Date.now()}
        title='Welcome to <span style="color: green">GreemOS!</span>'
        defaultCoords={{x: "50%", y: "50%"}}
        onClose={() => setReadedWelcomeScreen()}
        defaultSize={{x: 500, y: 500}}
        cantMinimize
        cantMaximize
        overflow="hidden"
        canResize={false}
        className="rounded-window"
    >
        <WelcomeScreenContent/>
    </Window>
}