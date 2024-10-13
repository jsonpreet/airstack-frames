/* eslint-disable react/jsx-key */
/** @jsxImportSource @airstack/frog/jsx */
import { Button, Frog, allowListFrogMiddleware as allowList } from '@airstack/frog'
import { handle } from '@airstack/frog/next'
import { devtools } from '@airstack/frog/dev'
import { serveStatic } from '@airstack/frog/serve-static'

// const neynarMiddleware = neynar({
// 	apiKey: '7C80F3B5-0FE2-4DAC-B21C-BC6A8684FC3D',
// 	features: ['interactor', 'cast'],
// })

// Instantiate new Frog instance with Airstack API key
export const app = new Frog({
	apiKey: process.env.NEXT_PUBLIC_AIRSTACK_API_KEY,
	title: 'The Professional Fry Slayer Test 🍟',
	basePath: '/api',
})

const allowListMiddleware = allowList({
	allowListCriteria: {
		numberOfFollowersOnFarcaster: 100,
		isFollowingOnFarcaster: [2602],
	},
})

app.frame('/', (c) => {
	const { buttonValue, status } = c
	return c.res({
		image: <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>{status === 'initial' ? 'Select your fruit!' : `Selected: ${buttonValue}`}</div>,
		intents: [<Button value="apple">Apple</Button>, <Button value="banana">Banana</Button>, <Button value="mango">Mango</Button>],
	})
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
