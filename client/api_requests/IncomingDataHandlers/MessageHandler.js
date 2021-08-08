import BaseHandler from './BaseHandler.js';
import { Message } from '../schemaDefinitions.js';

const endpoint = '/message';

class MessageHandler extends BaseHandler {
	static channel_message(data) {
		super.requestWrapper(Message, data, endpoint, 'POST');
	}
}

export default MessageHandler;
