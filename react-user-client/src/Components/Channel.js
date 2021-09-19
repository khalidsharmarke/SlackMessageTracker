import React from 'react';
import Button from 'react-bootstrap/Button';

function Channel(props) {
	// on selecting a channl
	// highlight the channel, and make it disabled
	let variant = 'link';
	let disabled = false;
	if (props.active) {
		variant = 'outline-link';
		disabled = true;
	}
	return (
		<Button
			className='ChannelButton'
			variant={variant}
			disabled={disabled}
			onClick={e =>
				props.changeActiveChannel(props.channel_name)
			}
		>
			{props.channel_name}
		</Button>
	);
}

export default Channel;
