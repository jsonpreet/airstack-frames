/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
import { neynar } from 'frog/middlewares'

const neynarMiddleware = neynar({
	apiKey: 'NEYNAR_FROG_FM',
	features: ['interactor', 'cast'],
})

const app = new Frog({ title: 'The Professional Fry Slayer Test 🍟', basePath: '/api', browserLocation: '/:path' })

app.frame('/', neynarMiddleware, (c) => {
	const { buttonValue, status } = c
	return c.res({
		image: (
			<div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
				{status === 'initial' ? `Welcome ${c.var.interactor?.displayName} to the Professional Fry Slayer Test 🍟` : `Selected: ${buttonValue}`}
			</div>
		),
		intents: [<Button value="follow">Follow</Button>, <Button value="recast">Recast</Button>, <Button value="like">Like</Button>],
	})
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
