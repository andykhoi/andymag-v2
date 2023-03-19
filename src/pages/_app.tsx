import type { AppProps } from 'next/app'

import { UserContextWrapper } from '@/contexts/UserContext'

import { Inter } from '@next/font/google'
import reset from '../styles/reset'

// default font across website
export const inter = Inter({
	weight: 'variable',
	subsets: ['latin'],
	// variable: '--font-inter',
})


export default function App({ Component, pageProps }: AppProps) {
	return (
		<UserContextWrapper>
			<main className={`${inter.className}`}>
				{/* is there a way to include the context of each article have the header / sidebar be global?  */}
				<Component {...pageProps} /> 
			</main>

			<style jsx global>
				{ reset }
			</style>
			<style jsx>{`
				main {
					height: 100%;
				}
			`}</style>
		</UserContextWrapper>
	)
}
