import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

// defautl font across website
const inter = Inter({
	weight: 'variable',
	subsets: ['latin'],
	variable: '--font-inter',
})


export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${inter.variable} font-sans`}>
			<Component {...pageProps} />
		</main>
	)
}
