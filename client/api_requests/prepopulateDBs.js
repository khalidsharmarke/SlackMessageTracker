import populateDB from './populateDB.js';
import { User, Channel } from './schema_definitions.js';

function populateUserDB(client) {
	return populateDB(client.users.list, User, '/user');
}

function populateChannelDB(client) {
	return populateDB(client.conversations.list, Channel, '/channel');
}

function prepopulateDBs(client) {
	return Promise.all([populateUserDB(client), populateChannelDB(client)]);
}

export default prepopulateDBs;
