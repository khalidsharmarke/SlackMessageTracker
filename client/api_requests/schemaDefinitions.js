function Message(data) {
	return {
		user_id: data.event.user,
		channel_id: data.event.channel,
		message_id: data.event.client_msg_id,
		body: data.event.text,
		ts: data.event_time,
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
