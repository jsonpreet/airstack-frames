import { userFollowFcChannelQuery } from '../graphql/UserFollowFcChannelQuery'
import { request } from 'graphql-request'

export const userFollowFcChannel = async (fid, channelId) => {
	const variables = {
		channelId: channelId,
		fid: `fc_fid:${fid}`,
	}

	if (!process.env.NEXT_PUBLIC_AIRSTACK_API_KEY) throw new Error('AIRSTACK_API_KEY not set')

	const headers = {
		Authorization: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY,
	}

	try {
		const result = await request(process.env.NEXT_PUBLIC_AIRSTACK_API_URL, userFollowFcChannelQuery, variables, headers)

		const lastActionTimestamp = result?.FarcasterChannelParticipants?.FarcasterChannelParticipant?.[0]?.lastActionTimestamp

		const isChannelFollow = lastActionTimestamp != null

		return isChannelFollow
	} catch (error) {
		console.error('Error occurred:', error)
		throw new Error('Something went wrong', { cause: error })
	}
}
