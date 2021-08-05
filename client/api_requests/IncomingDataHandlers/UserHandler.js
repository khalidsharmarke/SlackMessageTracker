import BaseHandler from './BaseHandler.js';
import { passDataToAPI } from '../populateDB.js';
import { User } from '../schemaDefinitions.js';

class UserHandler extends BaseHandler {
	static team_join(data) {
		return super.errorWrapper(
			passDataToAPI(super.constructItem(User, data), '/user', 'POST'),
		);
	}

	static user_change(data) {
		return super.errorWrapper(
			passDataToAPI(
				super.constructItem(User, data),
				`/user/${data.event.user.id}`,
				'PATCH',
			),
		);
	}
}

export default UserHandler;
