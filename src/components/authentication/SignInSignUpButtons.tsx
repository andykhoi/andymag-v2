import { useRouter } from 'next/router'
import { authenticatePaths } from './Authenticate'

export const SignInSignUpButtons = () => {
	const router = useRouter()

	return (
		<div>
			<button className={router.query.a === 'sign-in' ? 'active' : ''} onClick={() => router.push(authenticatePaths.signIn, undefined, { shallow: true })}>Sign in</button>
			<button className={router.query.a === 'create-account' ? 'active' : ''} onClick={() => router.push(authenticatePaths.createAccount, undefined, { shallow: true })}>Create account</button>
			<style jsx>{`
				button {
					background: none;
					border: 1px solid black
				}
				.active {
					border: 1px solid red
				}
			`}</style>
		</div>
	)
}