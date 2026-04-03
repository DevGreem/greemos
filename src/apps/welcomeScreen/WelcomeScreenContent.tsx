import "./welcomescreen.css";

export function WelcomeScreenContent() {

    return <div className="welcome-window">
        <h1>
            Welcome to GreemOS!
        </h1>

        <hr />

        A fully customizable web-based OS. You can program applications and add new applications from other users.
        <hr />

        For example, this is an application made for me, <span style={{color: "green"}}>DevGreem</span>.

        <br />
        
        For now, you can't program directly from the web in this version and create an application and use it, but in the future you will can :D

        <hr />

        <p>See <b>Wallpapers</b> app and customize your desktop!</p>

        <img src="iLikeIt.png" alt="" />
    </div>
}