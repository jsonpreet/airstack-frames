import { headers } from 'next/headers'

export function currentURL(pathname) {
	try {
		const headersList = headers()
		const host = headersList.get('x-forwarded-host') || headersList.get('host')
		const protocol = headersList.get('x-forwarded-proto') || 'http'

		return new URL(pathname, `${protocol}://${host}`)
	} catch (error) {
		console.error(error)
		return new URL('http://localhost:3000')
	}
}

export function appURL() {
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL
	} else {
		const url = process.NEXT_PUBLIC_APP_URL || vercelURL() || 'http://localhost:3000'
		console.warn(`Warning (examples): APP_URL environment variable is not set. Falling back to ${url}.`)
		return url
	}
}

export function vercelURL() {
	return process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : undefined
}

export function createExampleURL(path) {
	return new URL(path, appURL()).toString()
}
