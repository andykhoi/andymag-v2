import { FC, useState, useEffect, ReactNode } from 'react'
import { SignUpForm } from './SignUpForm'
import { useSignIn, useSignUp, useUser } from '@clerk/nextjs'
import { NextRouter, useRouter } from 'next/router'
import { SignInForm } from './SignInForm'
import { useClerk } from '@clerk/nextjs'
import { SignUpResource, SignInResource } from '@clerk/types'

import { SignInWithGoogleButton } from './SignInWithGoogle'
import { SignInSignUpButtons } from './SignInSignUpButtons'
import { OAuthContinueForm } from './OAuthContinueForm'
import { HandleSSOCallback } from './HandleSSOCallback'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export type AuthQueryValueType = 'create-account' | 'sign-in' | 'forgot-password' | 'continue-sign-up' | 'sso-callback'

export type AuthModeType = 'createAccount' | 'signIn' | 'forgotPassword' | 'continueOAuthSignUp' | 'oAuthRedirect'

export const allAuthQueryValues: AuthQueryValueType[] = ['create-account', 'sign-in', 'forgot-password', 'continue-sign-up', 'sso-callback']

// this will need to change to be shallow routed on all pages - simply append query to current pathname and shallow route
// export const authenticatePaths = {
// 	createAccount: '/?a=create-account',
// 	signIn: '/?a=sign-in',
// 	forgotPassword: '/?a=forgot-password',
// 	continueOAuthSignUp: '/?a=continue-sign-up',
// 	oAuthRedirectUrl: '/?a=sso-callback'
// }

export const setAuthMode = (mode: AuthModeType | null, router: NextRouter): AuthQueryValueType | null => {
	let queryValue: AuthQueryValueType | null;
	switch (mode) {
		case 'continueOAuthSignUp':
			queryValue = 'continue-sign-up'
			break
		case 'createAccount':
			queryValue = 'create-account'
			break
		case 'forgotPassword':
			queryValue = 'forgot-password'
			break
		case 'signIn':
			queryValue = 'sign-in'
			break
		case 'oAuthRedirect':
			queryValue = 'sso-callback'
			break
		default:
			queryValue = null
	}
	if (!queryValue) { 
		router.push(router.pathname, undefined, { shallow: true })
		return null
	}

	router.push(`${router.pathname}?a=${queryValue}`, undefined, { shallow: true })
	
	return queryValue
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

export const authModeMap: {
	[mode in AuthModeType]: {
		components: ReactNode[]
		close: boolean
		queryValue: string
		// a mode can be invalid if conditions aren't correct. Check if mode can exist with existing sign in or sign up state, else redirect.
		// check?: (options: {
		// 	signIn: SignInResource,
		// 	signUp: SignUpResource,
		// 	redirect: () => void
		// }) => void
		check?: (options: {
			signIn: SignInResource,
			signUp: SignUpResource,
		}) => boolean
	}
} = {
	signIn: {
		components: [<SignInWithGoogleButton key={'signIn'} />, <SignInSignUpButtons key={'signInSignUpButtons'}/>, <SignInForm key={'signInForm'} /> ],
		close: true,
		queryValue: 'sign-in'
	},
	createAccount: {
		components: [<SignInWithGoogleButton key={'signIn'} />, <SignInSignUpButtons key={'signInSignUpButtons'}/>, <SignUpForm key={'signUpForm'} /> ],
		close: true,
		queryValue: 'create-account'
	},
	forgotPassword: {
		components: [<ForgotPasswordForm key={'ForgotPasswordForm'} />],
		close: true,
		queryValue: 'forgot-password'
	},
	continueOAuthSignUp: {
		components: [<OAuthContinueForm key={'OAuthContinueForm'} />],
		close: false,
		queryValue: 'continue-sign-up',
		// check: (options) => {
		// 	const { signUp, redirect } = options
		// 	const {
		// 		missingFields,
		// 		verifications: {
		// 			externalAccount: {
		// 				status,
		// 				strategy
		// 			}
		// 		} 
		// 	} = signUp
		// 	if (missingFields.length > 0 && status === 'verified' && strategy === 'oauth_google') {
		// 		return
		// 	}
			
		// 	redirect()
		// }
		check: (options) => {
			const { signUp } = options
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
				return true
			}
			
			return false
		}
	},
	oAuthRedirect: {
		components: [<HandleSSOCallback key={'HandleSSOCallback'} /> ],
		close: false,
		queryValue: 'sso-callback',
		// check: (options) => {
		// 	const { 
		// 		signUp,
		// 		signIn,
		// 		signUp: {
		// 			missingFields,
		// 			verifications: {
		// 				externalAccount: {
		// 					status,
		// 					strategy
		// 				}
		// 			}
		// 		}
		// 	} = options
		// 	console.log(signUp, signIn, 'check')
		// 	if (strategy !== 'oauth_google' || status !== 'verified' || missingFields.length === 0) return false

		// 	return true
		// }
		check: (options) => {
			const { 
				signIn: {
					status,
					firstFactorVerification: {
						strategy,
						status: firstFactorVerificationStatus
					}
				}
			} = options
	
			if (strategy !== 'oauth_google' || status !== 'needs_identifier' || firstFactorVerificationStatus !== 'transferable') return false

			return true
		}
	}
}

export const Authenticate: FC = () => {
	const { isLoaded, signUp } = useSignUp()
	const { signIn } = useSignIn()
	const { user } = useUser();
	const router = useRouter()
	const mode = getAuthMode(router)

	// potentially tentative route handling - can potentially remove.
	useEffect(() => {
		if (mode && user) {
			setAuthMode(null, router)
		}
	}, [mode, router, user])

	const renderAuthComponents = () => {
		// if (!mode || !signIn || !signUp || !isLoaded) return null
		if (!mode || !signIn || !signUp || !isLoaded || user) return null
		const modeConfig = authModeMap[mode]
		
		if (modeConfig.check) {
			// modeConfig.check({
			// 	signIn, 
			// 	signUp,
			// 	redirect: () => router.push(router.pathname, undefined, { shallow: true }) // if mode is invalid set auth mode to null
			// })
			// return null
			const valid = modeConfig.check({
				signIn, 
				signUp,
			})

			if (!valid) {
				setAuthMode(null, router)
				return null
			}
		}

		return (
			<div>
				{ modeConfig.close && <button>back</button>}
				{ modeConfig.components.map(c => c) }
				<style jsx>{`
					div {
						width: 420px;
						background-color: blue;
					}
				`}</style>
			</div>
		)
	}

	return (
		<>
			{ renderAuthComponents() }
		</>
	)
}

