

export function DesktopIcon({title, img = "icons.svg"}: {title: string, img?: string}) {

    return <div className="desktop-icon">
        <img src={img} alt="" />
        <p>{title}</p>
    </div>
}