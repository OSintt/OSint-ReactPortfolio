import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import axios from 'axios';

import { url } from './config.json';

export default function Admin(props) {

	const [pathName, setPathName] = useState(null);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const listenUsername = e => {
		setUsername(e.target.value);
	}

	const listenPassword = e => {
		setPassword(e.target.value);
	}
	if (pathName !== null) return <Redirect to={pathName} /> 

	const handleSubmit = async e => {
		e.preventDefault();
		let res = await axios.post(`${url}/api/auth/signin`, {
			username,
			password
		});
		if (res.data.message) {
			setError(res.data.message);
		} else {
			localStorage.setItem("token", res.data.token);
			props.setAdmin(true);
			setPathName("/");
		}
	}
	
	return (
		<Slide bottom>
			<div className="container">
				<h1 className="titles">Admin login</h1>
				<div className="body">
					<hr/>
					<code>{error}</code>
					<input
						placeholder="Username"
						spellCheck="false"
						onChange={listenUsername}
						autoFocus
					/>
					<input
						placeholder="Password"
						type="password"
						spellCheck="false"
						onChange={listenPassword}
					/>
					<div className="send-comment">
						<span className="send-button" onClick={handleSubmit}>Send</span>
					</div>
				</div>
				<Link className="cross" to="/">🍩 <span>Go back</span></Link>
			</div>
		</Slide>
	)
}