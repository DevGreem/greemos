import type { WallpaperInfo } from "$/types/WallpaperInfo";


export class MemoryManager {

    private static _initialized: boolean = false;

    public static init() {

        if (this._initialized) {
            return;
        }

        this.loadDefaultData()
        this._initialized = true;
    }

    private static loadDefaultData() {

        const welcome = this.get("welcome-screen");

        if (!welcome) {
            this.set<boolean>("welcome-screen", true);
        }

        const wallpaper = this.get("wallpaper");

        if (!wallpaper) {
            const defaultWallpaperPath: WallpaperInfo = { type: "image", path: "./wallpapers/galactic.jpg"}
            this.setDict("wallpaper", defaultWallpaperPath)
        }
    }

    static get(key: string): string {
        return localStorage.getItem(key) as string;
    }

    static getDict<T extends Record<any, any>>(key: string): T {
        let item = localStorage.getItem(key) ?? "{}" as string;

        return JSON.parse(item);
    }

    static set<T extends Object>(key: string, data: T) {
        localStorage.setItem(key, data.toString())
    }

    static setDict<T extends Record<any, any>>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}