import Slide from 'react-reveal/Slide';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { url } from './config.json';

export default function Post() {
	const [wordCount, setWordCount] = useState(0);
	const [authorCount, setAuthorCount] = useState(0);
	const [textareaValue, setTextarea] = useState("");
	const [inputValue, setInput] = useState("");
	const [error, setError] = useState(null);
	const [isVerified, setVerified] = useState(false);
	const [triggerBoolean, setTriggerBoolean] = useState(false);
	const [pathName, setPathName] = useState(null);

	const recaptchaRef = React.createRef();

	if (pathName !== null) return <Redirect to={pathName} /> 

	const onChangeCaptcha = async e => {
  		const recaptchaValue = await recaptchaRef.current.getValue();
	  	setVerified(recaptchaValue);
	}
	const submitCaptcha = async e => {
		axios.post(`${url}/api/comments`, {
			author: inputValue,
			content: textareaValue,
			captcha: isVerified
		})
		.then(res => setPathName("/comments"))
		.catch(e => {
			setTriggerBoolean(false);
			setError(e.response.data.message);
		});
	}
	const listenInput = (e) => {
		setInput(e.target.value);
		setAuthorCount(e.target.value.length);
	}
	const listenTextarea = (e) => {
		setTextarea(e.target.value);
		setWordCount(e.target.value.length);
	}
	const handleSubmit = async e => {
		setTriggerBoolean(true);
	}


	return (
		<>
		<Slide bottom>
			<div className={triggerBoolean ? "display-none" : "container"}>
				<h1 className="titles">Post comments</h1>
				<div className="body">
					<hr/>
					<code>{error}</code>
					<input
						placeholder="Author..."
						spellCheck="false"
						onChange={listenInput}
						style={authorCount > 20 ? {color: "red"} : {}}
						autoFocus
					/>
					<textarea
						placeholder="Content..."
						rows="5"
						spellCheck="false"
						style={wordCount > 90 ? {color: "red"} : {}}
						onChange={listenTextarea}
					></textarea>
					<div className="send-comment">
						<span className="send-button" onClick={handleSubmit}>Send</span>
						<span className="word-count">{wordCount}/90</span>
					</div>
				</div>
				<Link className="cross" to="/">🍩 <span>Go back</span></Link>
			</div>
		</Slide>
		<Slide bottom when={triggerBoolean}>
			<div className={triggerBoolean ? "" : "display-none"}>
				<div>
					<ReCAPTCHA
						ref={recaptchaRef}
						theme="dark"
						sitekey="6LflXJMbAAAAAIbQ66nQHuqABXgP5518uIcJgZnn"
						onChange={onChangeCaptcha}
						className={triggerBoolean ? "" : "display-none"}
						id="g-recaptcha"
					/>
					<div className="send-comment">
						<span className="send-button" onClick={() => submitCaptcha()}>Send</span>
					</div>						
				</div>			
			</div>
		</Slide>
		</>
	)
}