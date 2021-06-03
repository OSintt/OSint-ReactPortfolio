import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import { Discord, Github, Google } from 'react-bootstrap-icons';
function Contact() {
	return (
		<div>
			<Slide bottom>
				<div className="container">
					<h1 className="titles">Contact</h1>
					<div className="body">
						<hr/>
						<p><strong>You can find me on:</strong></p>
						<ul>
							<li>
								<a target="_blank" href="https://discord.gg/gPQaN8GTQT"><Discord size={40}/></a>
							</li>
							<li>
								<a target="_blank" href="https://github.com/OSintt"><Github size={40}/></a>
							</li>
							<li>
								<a target="_blank" href="mailto:osintaxis@gmx.com"><Google size={40}/></a>
							</li>
						</ul>
						<Link className="cross" to="/">🍩 <span>Go back</span></Link>
						<hr className="hr"/>
					</div>
				</div>
			</Slide>
		</div>
	)
}

export default Contact;