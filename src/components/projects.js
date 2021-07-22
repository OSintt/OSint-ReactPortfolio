import React from 'react';
import projects from './projects.json';
import Slide from 'react-reveal/Slide';
import { NavLink as Link } from 'react-router-dom';
import { Github } from 'react-bootstrap-icons';

export default function Projects() {
	return (
		<div>
			<Slide bottom>
				<div className="container">
					<h1 className="titles">Projects</h1>
					<div className="body">
						<hr/>
						{projects.map((p, i) => {
							return (
								<div className="projects" key={i}>
									<h3>{p.name}</h3>
									{p.info ? <a href={p.info} target="_blank" rel="noreferrer"><Github /></a> : ""}
									<p>{p.description}</p>
								</div>
							)	
						})}
						<Link className="cross" to="/">🍩 <span>Go back</span></Link>
						<hr className="hr"/>
					</div>
				</div>
			</Slide>
		</div>
	)
}