import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// import { UserContextWrapper } from '@/contexts/UserContext'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from '@next/font/google'
import reset from '../styles/reset'

// default font across website
export const inter = Inter({
	weight: 'variable',
	subsets: ['latin'],
	// variable: '--font-inter',
})


export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter()
	return (
		// <UserContextWrapper>
		<>
		<ClerkProvider
			{...pageProps}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_API_KEY}
			navigate={(to) => {
				if (to === '/?a=sso-callback') router.push(to, undefined, { shallow: true })
				
				router.push(to)
			}}
		>
			<main className={`${inter.className}`}>
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
		</ClerkProvider>
		</>
		// </UserContextWrapper>
		
	)
}
