import { request } from 'graphql-request'
import { userFollowingQuery } from '../graphql/userFollowingQuery'

export const userFollowing = async (fid, followId) => {
	const variables = {
		followId: String(followId),
		fid: String(fid),
	}

	if (!process.env.NEXT_PUBLIC_AIRSTACK_API_KEY) throw new Error('AIRSTACK_API_KEY not set')

	const headers = {
		Authorization: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY,
	}

	try {
		const result = await request(process.env.NEXT_PUBLIC_AIRSTACK_API_URL, userFollowingQuery, variables, headers)

		const followings = result?.SocialFollowings?.Following || []

		// Check if any of the followings match the condition
		const isFollow = followings.some((following) => following.followerProfileId === String(fid) && following.followingProfileId === String(followId))

		return isFollow
	} catch (error) {
		console.error('Error occurred:', error)
		throw new Error('Something went wrong', { cause: error })
	}
}
