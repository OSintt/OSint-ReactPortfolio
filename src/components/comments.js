import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Slide from 'react-reveal/Slide';
import { url } from '../config.json';
dayjs.extend(relativeTime);

export default function Comments(props) {
	const [comments, setComments] = useState([]);
	const matches = useMediaQuery("(max-width: 758px)");
	
	useEffect(() => {
		async function fetchComments() {
			let sliceQ = matches ? 5 : 7;
			let res = await axios.get(`${url}/api/comments`);
			setComments(res.data.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			}).slice(0, sliceQ));
		}
		fetchComments();
	}, [matches]);

	const deleteMessage = async id => {
		try {
			await axios.delete(`${url}/api/comments/${id}`, {
          		headers: {
            		'Content-Type': 'application/json',
            		'x-access-token': localStorage.getItem('token')
          		}	
			});
			let commentCopy = [...comments];
			commentCopy.splice(commentCopy.indexOf(commentCopy.find(c => c._id === id)), 1);
			setComments(commentCopy);
		} catch(e) {
			console.log(e);
		}
	}

	return (
		<Slide bottom>
			<div className="comment-container">
				<h1 className="title-comments titles">Last {comments.length} comments</h1>
				<div className="comment-box">
					<Link to="/post">
						<code>Leave a comment!</code>
					</Link>
					{comments.map(c => {
						return (
							<div className="comment-card" key={c._id}>
								<h2 className="titles">{c.author}</h2>
								<code>{dayjs().to(dayjs(c.date))}</code>
								<p>{c.content}</p>
								<div className={props.isAdmin ? "send-comment" : "display-none"} onClick={() => deleteMessage(c._id)}>
									<span className="send-button">Delete</span>
								</div>
							</div>
						)
					})}
				</div>
				<Link className="cross" to="/">🍩 <span>Go back</span></Link>
			</div>
		</Slide>
	)
}