/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next'
import { frames } from './frames'
import React from 'react'
import { farcasterDataFramesjsMiddleware as farcasterData } from '@airstack/frames'
import { farcasterHubContext } from 'frames.js/middleware'
import { userFollowFcChannel } from '../../functions/userFollowFcChannel'
import { userFollowsChannel } from '../../functions/useFollowsChannel'
import { userFollowing } from '../../functions/userFollowing'

export const frameHandler = frames(
	async (ctx) => {
		// if (!ctx.message.isValid) {
		// 	throw new Error('Invalid Frame')
		// }
		//console.log({ ctx: ctx })
		let isAllFollowed = ctx.state.followJessy && ctx.state.followChannel
		console.log({ userDetails: ctx.message?.userDetails })
		console.log({ isValid: ctx.message?.isValid })
		console.log({ castId: ctx.message?.castId })
		console.log({ fid: ctx.message?.requesterFid })
		console.log({ searchParams: ctx.searchParams })
		console.log({ isAllFollowed })
		const baseUrl = ctx.url.origin
		switch (ctx.searchParams.value) {
			case 'checkStatus':
				const isFollow = await userFollowing(ctx.message?.requesterFid, 12921)
				const isChannelFollow = await userFollowsChannel(ctx.farcasterChannels, 'fries')
				ctx.state.followJessy = isFollow
				ctx.state.followChannel = isChannelFollow
				isAllFollowed = isFollow && isChannelFollow
				return {
					image: (
						<div
							style={{
								backgroundImage: `url(${baseUrl}/bg2.png)`, // Replace with your image path
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								width: '100%',
								height: '100%',
							}}
							tw="bg-pink-100 text-pink-600 w-full h-full justify-center  text-center items-center flex"
						>
							<span
								style={{
									fontWeight: 700,
									fontSize: '48px',
									lineHeight: '1.2',
								}}
							>
								{isAllFollowed ? 'Thank you for Follow' : "Oh no, you didn't complete the steps"}
							</span>
						</div>
					),
					buttons: [
						<Button action="post" target={isAllFollowed ? '/quiz' : { query: { value: 'checkStatus' } }}>
							{isAllFollowed ? 'Continue' : 'Check again'}
						</Button>,
					],
				}
			case 'ReCast':
				ctx.state.recasted = true
				return {
					image: (
						<div
							style={{
								backgroundImage: `url(${baseUrl}/bg2.png)`, // Replace with your image path
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								width: '100%',
								height: '100%',
							}}
							tw="bg-pink-100 text-pink-600 w-full h-full justify-center  text-center items-center flex"
						>
							<span
								style={{
									fontWeight: 700,
									fontSize: '48px',
									lineHeight: '1.2',
								}}
							>
								Thank you for your Re-Cast
							</span>
						</div>
					),
					buttons: [
						<Button action="post" target="/quiz">
							Continue
						</Button>,
					],
				}
		}

		let buttons = []

		if (!ctx.state.followJessy) {
			buttons.push(
				<Button action="link" target="https://warpcast.com/jessyjeanne">
					JessyJeanne
				</Button>
			)
		}

		if (!ctx.state.followChannel) {
			buttons.push(
				<Button action="link" target="https://warpcast.com/~/channel/fries">
					/fries
				</Button>
			)
		}

		// if (!ctx.state.recasted) {
		// 	buttons.push(
		// 		<Button action="post" target={{ query: { value: 'ReCast' } }}>
		// 			Recast
		// 		</Button>
		// 	)
		// }

		if (!ctx.state.followJessy || !ctx.state.followChannel || !ctx.state.recasted) {
			buttons.push(
				<Button action="post" target={{ query: { value: 'checkStatus' } }}>
					Check Status
				</Button>
			)
		}

		if (ctx.state.followJessy && ctx.state.followChannel && ctx.state.recasted) {
			buttons.push(
				<Button action="post" target="/quiz">
					Continue
				</Button>
			)
		}

		return {
			image: (
				<div
					style={{
						backgroundImage: `url(${baseUrl}/bg2.png)`, // Replace with your image path
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						width: '100%',
						height: '100%',
					}}
					tw="bg-pink-100 text-pink-600 w-full h-full justify-center text-center items-center flex flex-col"
				>
					<h2
						style={{
							fontWeight: 700,
							fontSize: '48px',
							lineHeight: '1.2',
							margin: 0,
						}}
					>
						The Professional Fry Slayer Test 🍟
					</h2>
					<h3 style={{ marginTop: 10, marginBottom: 80 }}>How professional are you?</h3>
					<p style={{ fontSize: '24px', marginTop: 0, marginBottom: 10 }}>To Continue,</p>
					<p style={{ fontSize: '24px', margin: 0 }}>Follow JessyJeanne and Fries Channel and recast this frame.</p>
				</div>
			),
			buttons: buttons,
		}
	},
	{
		middleware: [
			farcasterHubContext(),
			farcasterData({
				apiKey: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY,
				// Add `USER_DETAILS` to the `features` array
				features: ['user_details', 'farcaster_channels', 'farcaster_casts'],
			}),
		],
	}
)

export const GET = frameHandler
export const POST = frameHandler