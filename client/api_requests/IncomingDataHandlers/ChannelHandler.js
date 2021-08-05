import BaseHandler from './BaseHandler.js';
import { passDataToAPI } from '../populateDB.js';
import { Channel } from '../schema_definitions.js';

class ChannelHandler extends BaseHandler {
	static channel_created(data) {
		return super.errorWrapper(
			passDataToAPI(
				super.constructItem(Channel, data),
				'/channel',
				'POST',
			),
		);
	}

	static channel_archived(data) {}

	static channel_renamed(data) {}

	static channel_id_changed(data) {}
}

export default ChannelHandler;
