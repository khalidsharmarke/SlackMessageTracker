import APIRequestHandler from './api_request_handler.js';

const API = new APIRequestHandler(process.env.DJANGO_API);

function getDataFromSlack(app_method, cursor) {
	return app_method({
		token: process.env.SlACK_USER_TOKEN,
		cursor: cursor,
		limit: 100,
	});
}

function selectDataArray(data) {
	for (let value of Object.values(data)) {
		if (value instanceof Array) return value;
	}
	throw new Error('no array in Slack Payload');
}

function transformList(arr, constructor) {
	let result = [];
	for (let item of arr) {
		let instance = constructor(item);
		if (instance != null) {
			result.push(instance);
		}
	}
	return {
		[`${constructor.name.toLowerCase()}s`]: result,
	};
}

function passDataToAPI(data, endpoint, http_method) {
	// TODO:
	// validate http_methods
	// currently thinks "POST" is not "POST"
	// return new Promise((resolve, reject) => resolve());
	// TODO:
	// if wrapper for .env variable that we in testing to
	// not actually send request to django
	// ie: if (process.env.TESTING) then dont do below
	return API.sendRequest({
		method: http_method,
		url: endpoint,
		body: data,
	});
}

// on process start
async function populateDB(app_method, constructor, endpoint) {
	let cursor = '';
	let promisesArr = [];
	do {
		// for each available page of data from Slack
		try {
			// get new page of data from slack
			const slackData = await getDataFromSlack(
				app_method,
				cursor,
			);
			// parse page for needed data
			const selectedData = selectDataArray(slackData);
			// restructure data into wanted standard
			const transformedData = transformList(
				selectedData,
				constructor,
			);
			// send data to backend for writing to DB
			const response = await passDataToAPI(
				transformedData,
				endpoint,
				'POST',
			);
			// record the response from the backend for visual confirmation
			promisesArr.push(response);
			// move to the next page
			cursor = slackData.response_metadata.next_cursor;
		} catch (e) {
			console.log(e);
			break;
		}
	} while (cursor != '');
	return Promise.all(promisesArr);
}

export default populateDB;

export { passDataToAPI };
