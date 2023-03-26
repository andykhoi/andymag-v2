import { useSignUp } from '@clerk/nextjs'
import { useEffect } from 'react'

import { SignUpForm } from '@/components/SignUpForm'

const Home = () => {
	return (
		<div>
			<SignUpForm />
		</div>
	)
}

export default Home