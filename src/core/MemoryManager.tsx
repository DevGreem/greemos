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

        const wallpaper = this.get<WallpaperInfo>("wallpaper");

        if (!wallpaper) {
            const defaultWallpaperPath: WallpaperInfo = { type: "image", path: "./wallpapers/galactic.jpg"}
            this.set("wallpaper", defaultWallpaperPath)
        }
    }

    static get<T extends Object>(key: string): T {
        return localStorage.getItem(key) as T;
    }

    static getDict<T extends Record<any, any>>(key: string): T {
        let item = localStorage.getItem(key) as string;

        return JSON.parse(item);
    }

    static set<T extends Object>(key: string, data: T) {
        localStorage.setItem(key, data.toString())
    }

    static setDict<T extends Record<any, any>>(key: string, data: T) {
        localStorage.setItem(key, JSON.stringify(data));
    }
}