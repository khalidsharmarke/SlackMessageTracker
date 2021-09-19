import { passDataToAPI } from '../api_requests/populateDB.js';

class BaseHandler {
	static requestWrapper(constructor, data, endpoint, http_method) {
		try {
			let item = BaseHandler.constructItem(constructor, data);
			return passDataToAPI(item, endpoint, http_method);
		} catch (e) {
			console.log(e);
			return e;
		}
	}

	// constructs passable data for API
	// ex. {users: [list of users]}
	static constructItem(constructor, data) {
		const item = constructor(data);
		return {
			[`${constructor.name.toLowerCase()}s`]: [item],
		};
	}
}

export default BaseHandler;
