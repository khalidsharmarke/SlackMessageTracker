import BaseHandler from './BaseHandler.js';
import { Channel } from '../schemaDefinitions.js';

const ENDPOINT = '/channel';

class ChannelHandler extends BaseHandler {
	static channel_created(data) {
		return super.requestWrapper(Channel, data, ENDPOINT, 'POST');
	}

	static channel_archived(data) {}

	static channel_renamed(data) {}

	static channel_id_changed(data) {}
}

export default ChannelHandler;
