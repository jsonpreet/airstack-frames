import { fetchMetadata } from 'frames.js/next'

export async function generateMetadata() {
	try {
		const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'
		console.log('Fetching metadata from:', new URL('/frames', baseUrl).toString())
		const frameMetadata = await fetchMetadata(new URL('/frames', baseUrl))
		console.log('Fetched metadata:', frameMetadata)
		return {
			title: 'Jessy Frame',
			other: {
				...frameMetadata,
			},
		}
	} catch (error) {
		console.error('Error fetching metadata:', error)
		return {
			title: 'Jessy Frame',
			other: {
				// Fallback metadata
			},
		}
	}
}

export default function Page() {
	return <span>My existing page</span>
}
