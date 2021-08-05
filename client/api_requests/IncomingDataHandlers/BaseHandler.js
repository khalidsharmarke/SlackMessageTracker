class BaseHandler {
	static errorWrapper(promise) {
		try {
			return promise;
		} catch (e) {
			return e;
		}
	}

	static constructItem(constructor, data) {
		const item = constructor(data);
		return {
			[`${constructor.name.toLowerCase()}`]: item,
		};
	}
}

export default BaseHandler;
