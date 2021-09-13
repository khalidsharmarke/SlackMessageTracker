import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Channel from './Channel';

function ChannelList(props) {
	if (props.channels === undefined) {
		return null;
	}
	return (
		<ButtonGroup vertical className='ChannelList group'>
			{props.channels.map(channel_name => {
				let active = false;
				if (channel_name === props.active_channel) {
					active = true;
				}
				return (
					<Channel
						active={active}
						key={channel_name}
						channel_name={channel_name}
						changeActiveChannel={
							props.changeActiveChannel
						}
					/>
				);
			})}
		</ButtonGroup>
	);
}

export default ChannelList;
