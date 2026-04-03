import { useState, type FC, type HTMLAttributes } from "react"
import "./windowcontent.css"
import { WindowContentContext } from "$/context/window/WindowContentContext";

const WindowContent: FC<HTMLAttributes<HTMLDivElement>> = (attributes: HTMLAttributes<HTMLDivElement>) => {

    const [actualAttributes, setActualAttributes] = useState(attributes);

    return <div {...actualAttributes} className={`window-content ${actualAttributes.className || ""}`}>
        <WindowContentContext.Provider value={{attributes: actualAttributes, setAttributes: setActualAttributes}}>
            {actualAttributes.children}
        </WindowContentContext.Provider>
    </div>
}

export default WindowContent;