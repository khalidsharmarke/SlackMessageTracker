import BaseHandler from './BaseHandler.js';
import { User } from '../schemaDefinitions.js';

const endpoint = '/user';

class UserHandler extends BaseHandler {
	static team_join(data) {
		return super.requestWrapper(User, data, endpoint, 'POST');
	}

	static user_change(data) {
		modifiedEndpoint = endpoint + `/${data.event.user.id}`;
		return super.requestWrapper(
			User,
			data,
			modifiedEndpoint,
			super.patch,
		);
	}
}

export default UserHandler;
