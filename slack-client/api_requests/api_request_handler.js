import request from 'request-promise';

class APIRequestHandler {
	constructor(backend_uri) {
		this.count = 0;
		this.failed_requests = [];
		this.backend_uri = backend_uri;
	}
	async clearOutFailedRequests() {
		let temp_failures = [];
		for (let req in this.failed_requests) {
			request(req).catch(error => temp_failures.push(req));
		}
		this.failed_requests = temp_failures;
	}
	async sendRequest(req_params) {
		let response;
		const req = {
			baseUrl: this.backend_uri,
			json: true,
			...req_params,
		};
		console.log(req);
		try {
			this.clearOutFailedRequests();
			response = await request(req);
		} catch (e) {
			this.failed_requests.push(req);
			response = e.toString();
		}
		return response;
	}
}

export default APIRequestHandler;
