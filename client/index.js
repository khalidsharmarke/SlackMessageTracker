import 'dotenv/config';
import App from '@slack/bolt';
import prepopulateDBs from './api_requests/prepopulateDBs.js';
import {
	UserHandler,
	ChannelHandler,
	MessageHandler,
} from './api_requests/IncomingDataHandlers/index.js';

const app = new App.App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.APP_SIGNING_SECRET,
});

// TODO:
// find out if can implement separate WebClient instance
// that can take .env variable here
const WebClient = app.client;

// TODO:
// catch each event needed
app.event('team_join', UserHandler.team_join);
app.event('user_change', UserHandler.user_change);
app.event('channel_created', ChannelHandler.channel_created);
app.event('channel_archive', ChannelHandler.channel_archived);
app.event('channel_rename', ChannelHandler.channel_renamed);
app.event('channel_id_changed', ChannelHandler.channel_id_changed);
app.event('message', MessageHandler.channel_message);

async function startApp() {
	await prepopulateDBs(WebClient)
		.then(arr_of_responses => console.log(arr_of_responses))
		.catch(error => console.log(error));
	await app.start(process.env.PORT);

	console.log(`app running on port ${process.env.PORT}`);
}
startApp();
