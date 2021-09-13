import BaseHandler from './BaseHandler.js';
import { User } from '../schemaDefinitions.js';

const ENDPOINT = '/user';

class UserHandler extends BaseHandler {
	static team_join(data) {
		return super.requestWrapper(User, data, ENDPOINT, 'POST');
	}

	static user_change(data) {
		modifiedEndpoint = ENDPOINT + `/${data.event.user.id}`;
		return super.requestWrapper(
			User,
			data,
			modifiedEndpoint,
			'PATCH',
		);
	}
}

export default UserHandler;
