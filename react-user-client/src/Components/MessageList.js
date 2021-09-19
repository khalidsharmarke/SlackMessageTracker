import React from 'react';
import Container from 'react-bootstrap/Container';
import Message from './Message';

function MessageList(props) {
	if (props.messages === undefined) {
		return null;
	}
	return (
		<Container className='grouped-text-will-scroll-on-overflow'>
			{props.messages.map(message => (
				<Message key={message.ts} data={message} />
			))}
		</Container>
	);
}

export default MessageList;
