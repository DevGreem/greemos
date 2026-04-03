import Window from "./Window";
import { WelcomeScreen } from "../../../apps/welcomeScreen/WelcomeScreen";
import { useWindows } from "$/context/window/WindowsContext";


export function WindowContainer() {

    const { showWelcomeScreen, windows } = useWindows();
    
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