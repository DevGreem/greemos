import { createContext, useContext, type Dispatch, type HTMLAttributes, type SetStateAction } from "react";

interface WindowContentContextType {
    attributes: HTMLAttributes<HTMLDivElement>;
    setAttributes: Dispatch<SetStateAction<HTMLAttributes<HTMLDivElement>>>;
}


export const WindowContentContext = createContext<WindowContentContextType|undefined>(undefined)

export function useWindowContentData() {
    const context = useContext(WindowContentContext);
    
    if (!context) throw new Error("No window content data!");

    return context;
} 