import { useEffect } from 'react'
import { Authenticate } from '@/components/authentication/Authenticate'
import { SignUpForm } from '@/components/authentication/SignUpForm'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { useClerk, useSignUp, useSignIn } from '@clerk/nextjs'
import { usePreferences, useActivity } from '@/contexts/UserContext'
import { useGetPreferencesAndActivityWithIdLazyQuery } from '@/graphql/queries/getPreferencesAndActivityWithId'
import { useApolloClient } from '@apollo/client'

const Home = () => {
	// const { user } = useUser()
	const { signOut } = useClerk()
	const client  = useApolloClient()
	// const { signUp } = useSignUp()
	// const { signIn } = useSignIn()
	const { isLoading: isPreferencesLoading, preferences, updatePreferences } = usePreferences()
	const { isLoading: isActivityLoading, activity, updateActivity } = useActivity()
	const { user } = useUser()

	return (
		<div>
			<button onClick={() => {
				client.cache.reset()
				signOut()
			}}>sign out</button>
			<button onClick={() => updateActivity({ type: 'navigation', tags: ['page:home'], timestamp: Date.now().toString() }) }>update activity</button>
			<button onClick={() => updatePreferences({ autoCollapseHeader: true, fontSize: 'sm' })}>update preference</button>
		</div>
	)
}

export default Home