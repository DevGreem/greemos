import type { UniqueWindowInfo, WindowInfo } from "$/types/window/WindowInfo";


export class AppsManager {

    private static get database(): Promise<IDBDatabase> {

        return new Promise((resolve, reject) => {
            const request = indexedDB.open("GreemOS", 1);

            request.onupgradeneeded = () => {
                const db = request.result;
                
                if (!db.objectStoreNames.contains("apps")) {
                    db.createObjectStore("apps", {keyPath: "id"});
                }
            }

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        })
        
    }

    public static async installApp(app: WindowInfo): Promise<boolean> {
        const db = await this.database;

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("apps", "readwrite");
            const table = transaction.objectStore("apps");

            const request = table.put({id: Date.now(), ...app});

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        })
    }

    public static async getApp(id: number): Promise<UniqueWindowInfo> {
        const db = await this.database;

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("apps", "readonly");
            const table = transaction.objectStore("apps");

            const request = table.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        })
    }

    public static async getAllApps(): Promise<UniqueWindowInfo[]> {
        const db = await this.database;

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("apps", "readonly");
            const table = transaction.objectStore("apps");

            const request = table.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        })
    }
}