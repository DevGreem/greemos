
export interface AppInfo {
    title: string,
    icon?: string
}

export interface UniqueAppInfo extends AppInfo {
    id: number
}