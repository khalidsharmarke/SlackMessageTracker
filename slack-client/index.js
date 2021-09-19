import 'dotenv/config';
import App from '@slack/bolt';
import prepopulateDBs from './api_requests/prepopulateDBs.js';
import {
	UserHandler,
	ChannelHandler,
	MessageHandler,
} from './slack_event_handlers/index.js';

const app = new App.App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.APP_SIGNING_SECRET,
});

const SlackWebClient = app.client;

app.event('team_join', UserHandler.team_join);
app.event('user_change', UserHandler.user_change);
app.event('channel_created', ChannelHandler.channel_created);
app.event('channel_archive', ChannelHandler.channel_archived);
app.event('channel_rename', ChannelHandler.channel_renamed);
app.event('channel_id_changed', ChannelHandler.channel_id_changed);
app.event('message', MessageHandler.channel_message);

async function startApp() {
	await prepopulateDBs(SlackWebClient)
		.then(responses => console.log(responses))
		// In the event we fail to fetch the pre-needed Slack Data
		// exit the script
		// likely do to incorrect API keys
		.catch(error => {
			throw error;
		});
	app.start(process.env.PORT);
	console.log(`app running on port ${process.env.PORT}`);
}
startApp();
