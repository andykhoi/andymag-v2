import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
// import { UserContextWrapper } from '@/contexts/UserContext'
import { ClerkProvider, SignedOut} from '@clerk/nextjs'
import { Inter } from '@next/font/google'
import reset from '../styles/reset'

import { Authenticate, getAuthMode } from '@/components/authentication/Authenticate'
// import { UserContextProvider } from '@/contexts/UserContext'
import { ActivityContextProvider } from '@/contexts/ActivityContext'
import { ApolloProviderWithClerk } from '@/contexts/ApolloProviderWithClerk'

// default font across website
export const inter = Inter({
	weight: 'variable',
	subsets: ['latin'],
})


export default function App({ Component, pageProps }: AppProps) {
	// const router = useRouter()
	// const authMode = getAuthMode(router)

	return (
		<ClerkProvider
			{...pageProps}
			publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_API_KEY}
		>
			<ApolloProviderWithClerk>
				{/* <UserContextProvider> */}
				<ActivityContextProvider>
					<main className={`${inter.className}`}>
						<Component {...pageProps} />
						{/* <SignedOut>
							{ authMode && <Authenticate /> }
						</SignedOut> */}
						{/* 
							potensh could use user context consumer here to conditionally render
							<Authenticate />, rather than have <Authenticate /> handle its visibility
							itself. This will also allow for the popup wrapper to wrap <Authenticate />.

							Come back to this once Hasura is hooked up and UserContext has been created.
							For now leave as is.
						*/}
						<Authenticate /> 
					</main>

					<style jsx global>
						{ reset }
					</style>
					<style jsx>{`
						main {
							height: 100%;
						}
					`}</style>
				</ActivityContextProvider>
				{/* </UserContextProvider> */}
			</ApolloProviderWithClerk>
		</ClerkProvider>
	)
}
