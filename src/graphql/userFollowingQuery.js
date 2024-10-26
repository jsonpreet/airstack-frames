import { gql } from '@apollo/client' // or whatever GraphQL client you're using

export const userFollowingQuery = gql`
	query isFollowing($followId: String!, $fid: String!) {
		SocialFollowings(input: { filter: { followingProfileId: { _eq: $followId }, followerProfileId: { _eq: $fid } }, blockchain: ALL }) {
			Following {
				followerProfileId
				followingProfileId
				followingSince
				dappName
				followerAddress {
					addresses
				}
			}
		}
	}
`
