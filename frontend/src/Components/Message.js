import React from 'react';

function Message(props) {
	function UNIXtoLocalTime(unix_ts) {
		// const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		// const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		const date = new Date(unix_ts * 1000);
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();

		return `${hour}:${minute} ${month}/${day}/${year}`;
	}

	const message = props.data;

	return (
		<div>
			<span>{message.user}</span>
			<span>{UNIXtoLocalTime(message.ts)}</span>
			<div>{message.body}</div>
		</div>
	);
}

export default Message;
