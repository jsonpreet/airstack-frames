export const userFollowsChannel = async (channels, channelId) => {
	const channel = channels.find((channel) => channel.name === channelId)
	console.log({ channel })
	return channel != null
}
