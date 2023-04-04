import { FC, FormEvent, useState } from 'react'
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";
import { EmailCodeFactor, SignInCreateParams, SignInResource, ClerkAPIError, PrepareFirstFactorParams, AttemptFirstFactorParams } from '@clerk/types'
import Link from 'next/link'
import { authModeMap, setAuthMode } from './Authenticate';
import { Spinner } from '../Spinner';

export const ForgotPasswordForm: FC = () => {
	const router = useRouter();
	const { signIn, isLoaded, setActive }  = useSignIn();

	const [identifier, setIdentifier] = useState<string>('')
	const [identifierError, setIdentifierError] = useState<string>('')

	const [code, setCode] = useState<string>('')
	const [codeError, setCodeError] = useState<string>('')
	const [codeCopy, setCodeCopy] = useState<string>('')

	const [stage, setStage] = useState<'identifier' | 'verification'>('identifier')
	const [loading, setLoading] = useState<boolean>(false)

	const trySignIn = async (params: SignInCreateParams): Promise<[SignInResource | null, ClerkAPIError[] | string | null]> => {
		if (!signIn) return [null, 'Clerk sign in unavailable']
		
		try {
			const signInAttempt = await signIn.create(params)

			return [signInAttempt, null]
		} catch (e: any) {
			return [signIn, (e.errors as ClerkAPIError[])]
		}
	}

	const tryFirstFactorSignIn = async (params: AttemptFirstFactorParams): Promise<[SignInResource | null, ClerkAPIError[] | string | null]> => {
		if (!signIn) return [null, 'Clerk sign in unavailable']
		
		try {
			const signInAttempt = await signIn.attemptFirstFactor(params)

			return [signInAttempt, null]
		} catch (e: any) {
			return [signIn, (e.errors as ClerkAPIError[])]
		} 
	}

	const trySendingEmailCode = async (params: PrepareFirstFactorParams):  Promise<[SignInResource | null, ClerkAPIError[] | string | null]> => {
		if (!signIn) return [null, 'Clerk sign in not available']
		
		try {
			const trySendingEmailCode = await signIn.prepareFirstFactor(params);

			return [trySendingEmailCode, null]
		} catch (e) {
			return [null, (e as any).errors as ClerkAPIError[]]
		}
	}

	const onCredentialSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (!isLoaded || !signIn) return
		
		setLoading(() => true)

        const [signInWithIdentifier, errors] = await trySignIn({ identifier })
		
		if (errors) {
			if (typeof errors === 'string') { 
				console.log(errors)
			} else {
				errors.forEach(({ 
					message,
					meta
				}) => {
					if (meta?.paramName === 'identifier') {
						setIdentifierError(() => message)
					}
				})
			}
			setLoading(false)
			return
		}

		if (!signInWithIdentifier) {
			setLoading(false)
			return
		}

        const firstEmailFactor = signInWithIdentifier.supportedFirstFactors.find(factor => {
          return factor.strategy === 'email_code'
        });
        
        const { emailAddressId } = firstEmailFactor as EmailCodeFactor;

		const [, emailCodeErrors] = await trySendingEmailCode({ strategy: 'email_code', emailAddressId})

		if (emailCodeErrors) {
			if (typeof emailCodeErrors === 'string') {
				console.log(emailCodeErrors)
			} else {
				emailCodeErrors.forEach(({ 
					message,
					// meta
				}) => {
					setIdentifierError(() => message)
				})
			}

			setLoading(false)
			return 
		}

		setCodeCopy(`Please check ${identifier} for your code.`)
		setStage('verification')
		setLoading(false)
	}

	const onVerificationSubmitHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (!isLoaded || !signIn) return

		setLoading(true)
		const [signInAttempt, errors] = await tryFirstFactorSignIn({
			strategy: 'email_code',
			code
		})

		if (errors) {
			if (typeof errors === 'string') { 
				console.log(errors)
			} else {
				errors.forEach(({ 
					message,
					meta
				}) => {
					if (meta?.paramName === 'code') {
						setCodeError(() => message)
					}
				})
			}
			setLoading(false)
			return
		}

		setActive({session: signInAttempt?.createdSessionId})
		// later redirect to profile page where user can reset password
		setAuthMode(null, router)
		setLoading(false)
	}
	
	return (
		<div>
			<p>Sign in with a OTP to reset your password</p>
			{
				stage === 'verification' &&
				<form onSubmit={onVerificationSubmitHandler}>
					<div>
						<input 
							type="text"
							value={code}
							placeholder='Code'
							onChange={e => {
								setCode(e.target.value)
								setCodeCopy(() => '')
								setCodeError(() => '')
							}}
							required
						/>
						{ codeCopy && <p>{ codeCopy }</p>}
						{ codeError && <p>{ codeError }</p>}
					</div>
					<button type='submit'>
						<div>
							{ loading ?  <Spinner /> : 'Sign in' }
						</div>
					</button>
				</form>
			}
			{
				stage === 'identifier' && 
				<form onSubmit={onCredentialSubmitHandler}>
					<div>
						<input 
							type="email"
							placeholder='Email'
							value={identifier}
							onChange={e => {
								setIdentifier(e.target.value)
								setIdentifierError(() => '')
							}}
							required
						/>
						{ identifierError && <p>{ identifierError }</p>}
					</div>
					<button type='submit'>
						<div>
							{ loading ?  <Spinner /> : 'Send code' }
						</div>
					</button>
				</form>
			}
			<Link href={`${authModeMap.signIn.queryValue}`} shallow>Sign in or sign up</Link>
		</div>
	);
}

