export default function loadingScreen() {

	return (
        <div className="loading">
            <h1>Wait for a second...</h1>
            <hr/>
            <code>Uncaught ReferenceError:<br/>'connection' is not defined</code>
            <img alt="Loading Screen Gif" src="https://cdn.discordapp.com/emojis/859845219285336134.gif?v=1"/>
        </div>
	)
}