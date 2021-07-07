import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';

function About(props) {
	return (
		<div>
			<Slide bottom>
				<div className="container">
					<h1 className="titles">About me</h1>
					<div className="body">
						<hr/>
						<p>
						Hello, my name is OSint.<br/> 
						I'm a junior fullstack web developer who loves JavaScript, TypeScript and back-end w/ Node.js, GraphQL and Rest API<br/>
						</p>
						<Link className="cross" to="/">🍩 <span>Go back</span></Link>
						<hr className="hr"/>
					</div>
				</div>
			</Slide>
		</div>
	)
}

export default About;