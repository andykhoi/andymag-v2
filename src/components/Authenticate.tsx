import { FC, useState, useEffect } from 'react'
import { SignUpForm } from './SignUpForm'
import { useSignIn, useSignUp, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import { SignInForm } from './SignInForm'
import { useClerk } from '@clerk/nextjs'
import SignInWithGoogleButton from './SignInWithGoogle'
export const Authenticate: FC = () => {
	const { signUp } = useSignUp()
	const { signIn } = useSignIn()
	const { isLoaded, user } = useUser()
	const { handleRedirectCallback } = useClerk()
	const router = useRouter()
	
	useEffect(() => {
		if (router.query.a === 'sso-callback') {
			handleRedirectCallback({
				redirectUrl: router.pathname,
			})
		}
	}, [handleRedirectCallback, router])

	return (
		<div>
			<SignInWithGoogleButton />
			<SignInSignUpButtons />
			{ router.query.a === 'create-account' && <SignUpForm />}
			{ router.query.a === 'sign-in' && <SignInForm />}
		</div>
	)
}

const SignInSignUpButtons = () => {
	const router = useRouter()

	return (
		<div>
			<button className={router.query.a === 'sign-in' ? 'active' : ''} onClick={() => router.push('/?a=sign-in', undefined, { shallow: true })}>Sign in</button>
			<button className={router.query.a === 'create-account' ? 'active' : ''} onClick={() => router.push('/?a=create-account', undefined, { shallow: true })}>Create account</button>
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