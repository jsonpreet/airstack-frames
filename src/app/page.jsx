import { fetchMetadata } from 'frames.js/next'

export async function generateMetadata() {
	const frameMetadata = await fetchMetadata(new URL('/frames', process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'))
	return {
		title: 'My Frame',
		other: {
			...frameMetadata,
		},
	}
}

export default function Page() {
	return <span>My existing page</span>
}
