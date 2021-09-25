import BaseHandler from './BaseHandler.js';
import { Message } from '../api_requests/schemaDefinitions.js';

const ENDPOINT = '/message';

class MessageHandler extends BaseHandler {
	static channel_message(data) {
		super.requestWrapper(Message, data, ENDPOINT, 'POST');
	}
}

export default MessageHandler;
