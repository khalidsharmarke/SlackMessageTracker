function Message(data) {
	return {
		user_id: data.event.user,
		channel_id: data.event.channel,
		message_id: data.event.client_msg_id,
		body: data.event.text,
		ts: data.event.event_ts.split('.')[0],
		// is_edit: null,
		// is_thread: null
	};
}

function Channel(data) {
	return {
		channel_id: data.id,
		name: data.name,
		archived: data.is_archived,
	};
}

function User(data) {
	return {
		user_id: data.id,
		name: data.name,
		full_name: data.profile.real_name,
		display_name: data.profile.display_name,
		deleted: data.deleted,
		is_bot: data.is_bot,
	};
}

export { Message, Channel, User };
