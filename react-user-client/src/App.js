import React, { Component } from 'react';
import ChannelList from './Components/ChannelList';
import MessageList from './Components/MessageList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			__active_channel: null,
			data: {},
		};
		this.ws = new WebSocket(process.env.REACT_APP_BackEnd_URI);
		this.ws.onerror = e => console.log(e);
		this.ws.onopen = e => console.log('WS connnected');
		this.ws.onmessage = this.handleIncomingData;
	}

	// on new data from server
	handleIncomingData = payload => {
		const data = JSON.parse(payload.data);
		for (let channel in data) {
			// add new list of data to state
			if (this.state[channel] === undefined) {
				this.setState(state => {
					state.data[channel] = data[channel];
					return state;
				});
			}
			// add to preexisting list in state
			if (this.state[channel] !== undefined) {
				this.setState(state => {
					state.data[channel].push(...data[channel]);
					return state;
				});
			}
		}
	};

	changeActiveChannel = channel_name => {
		this.setState({ __active_channel: channel_name });
	};

	render() {
		return (
			<div className='App'>
				<ChannelList
					active_channel={this.state.__active_channel}
					changeActiveChannel={this.changeActiveChannel}
					channels={Object.keys(this.state.data)}
				/>
				<MessageList
					messages={
						this.state.data[this.state.__active_channel]
					}
				/>
			</div>
		);
	}
}

export default App;
