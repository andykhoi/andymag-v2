import { useEffect } from 'react'
import { Authenticate } from '@/components/authentication/Authenticate'
import { SignUpForm } from '@/components/authentication/SignUpForm'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { useClerk, useSignUp, useSignIn } from '@clerk/nextjs'

const Home = () => {
	const { user } = useUser()
	const { signOut } = useClerk()
	const { signUp } = useSignUp()
	const { signIn } = useSignIn()
	
	return (
		<div>
			<button onClick={() => signOut()}>sign out</button>
		</div>
	)
}

export default Home