import { useEffect } from 'react'
import { Authenticate } from '@/components/authentication/Authenticate'
import { SignUpForm } from '@/components/authentication/SignUpForm'
import { useRouter } from 'next/router'
import { useUser } from '@clerk/nextjs'
import { useClerk } from '@clerk/nextjs'

const Home = () => {
	const router = useRouter()
	const { isLoaded, user } = useUser()
	const { signOut } = useClerk()
	// console.log(user)
	return (
		<div>
			{/* <Authenticate /> */}
			<button onClick={() => signOut()}>sign out</button>
		</div>
	)
}

export default Home