import { FC, useState, useEffect, ReactNode } from 'react'
import { SignUpForm } from './SignUpForm'
import { useSignIn, useSignUp, useUser } from '@clerk/nextjs'
import { NextRouter, useRouter } from 'next/router'
import { SignInForm } from './SignInForm'
import { useClerk } from '@clerk/nextjs'
import { SignUpResource, SignInResource } from '@clerk/types'

import { SignInWithGoogleButton } from './SignInWithGoogle'
import { SignInSignUpButtons } from './SignInSignUpButtons'

export type AuthQueryValueType = 'create-account' | 'sign-in' | 'forgot-password' | 'continue-sign-up' | 'sso-callback'

export type AuthModeType = 'createAccount' | 'signIn' | 'forgotPassword' | 'continueOAuthSignUp' | 'oAuthRedirect'

export const allAuthQueryValues: AuthQueryValueType[] = ['create-account', 'sign-in', 'forgot-password', 'continue-sign-up', 'sso-callback']

// this will need to change to be shallow routed on all pages - simply append query to current pathname and shallow route
export const authenticatePaths = {
	createAccount: '/?a=create-account',
	signIn: '/?a=sign-in',
	forgotPassword: '/?a=forgot-password',
	continueOAuthSignUp: '/?a=continue-sign-up',
	oAuthRedirectUrl: '/?a=sso-callback'
}

export const getAuthMode = (router: NextRouter): AuthModeType | null => {
	if (!router.isReady) return null 

	if (!router.query.a) return null

	if (!allAuthQueryValues.includes(router.query.a as any)) return null

	const authQueryValue = router.query.a as AuthQueryValueType

	switch (authQueryValue) {
		case 'continue-sign-up':
			return 'continueOAuthSignUp'
		case 'create-account':
			return 'createAccount'
		case 'forgot-password':
			return 'forgotPassword'
		case 'sign-in':
			return 'signIn'
		case 'sso-callback':
			return 'oAuthRedirect'
		default:
			return null
	}
}

const authModeMap: {
	[mode in AuthModeType]: {
		components: ReactNode[]
		close: boolean
		// a mode can be invalid if conditions aren't correct. Check if mode can exist with existing sign in or sign up state, else redirect.
		check?: (options: {
			signIn: SignInResource,
			signUp: SignUpResource,
			redirect: () => void
		}) => void
	}
} = {
	signIn: {
		components: [<SignInWithGoogleButton key={'signIn'} />, <SignInSignUpButtons key={'signInSignUpButtons'}/>, <SignInForm key={'signInForm'} /> ],
		close: true
	},
	createAccount: {
		components: [<SignInWithGoogleButton key={'signIn'} />, <SignInSignUpButtons key={'signInSignUpButtons'}/>, <SignUpForm key={'signUpForm'} /> ],
		close: true
	},
	// need to develop
	forgotPassword: {
		components: [],
		close: true
	},
	// need to develop the components
	continueOAuthSignUp: {
		components: [],
		close: false,
		check: (options) => {
			const { signUp, redirect } = options
			const {
				missingFields,
				verifications: {
					externalAccount: {
						status,
						strategy
					}
				} 
			} = signUp

			if (missingFields.length > 0 && status === 'verified' && strategy === 'oauth_google') {
				return
			}

			redirect()
		}
	},
	// render a loading visual? 
	oAuthRedirect: {
		components: [],
		close: false
	}
}

export const Authenticate: FC = () => {
	const { handleRedirectCallback } = useClerk()
	const { isLoaded, signUp } = useSignUp()
	const { signIn } = useSignIn()
	const router = useRouter()
	const mode = getAuthMode(router)

	useEffect(() => {
		if (!mode || mode !== 'oAuthRedirect') return
		
		handleRedirectCallback({
			continueSignUpUrl: authenticatePaths.continueOAuthSignUp
		})
	}, [mode, handleRedirectCallback])

	const renderAuthComponents = () => {
		if (!mode || !signIn || !signUp || !isLoaded) return null

		const modeConfig = authModeMap[mode]
		
		if (modeConfig.check) {
			modeConfig.check({
				signIn, 
				signUp,
				redirect: () => router.push(router.pathname, undefined, { shallow: true }) // if mode is invalid set auth mode to null
			})
		}

		return (
			<div>
				{ modeConfig.close && <button>back</button>}
				{ modeConfig.components.map(c => c) }
			</div>
		)
	}

	return (
		<>
			{ renderAuthComponents() }
		</>
	)
}

