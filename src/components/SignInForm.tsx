import { FC, FormEvent, useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { SignInCreateParams, SignInResource, ClerkAPIError } from '@clerk/types'
import { Spinner } from './Spinner'

export const SignInForm: FC = () => {
	const { isLoaded, signIn, setActive } = useSignIn()

	const [identifier, setIdentifier] = useState<string>('')
	const [identifierError, setIdentifierError] = useState<string>('')

	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>('')

	const [loading, setLoading] = useState<boolean>(false)

	const trySignIn = async (params: SignInCreateParams): Promise<[SignInResource | null, ClerkAPIError[] | null]> => {
		if (!signIn) return [null, null]
		
		try {
			const signInAttempt = await signIn.create({
				identifier,
				password
			})
			return [signInAttempt, null]
		} catch (e: any) {
			return [signIn, (e.errors as ClerkAPIError[])]
		}
	}

	const resetErrors = () => {
		setIdentifierError(() => '')
		setPasswordError(() => '')
	}

	const handleSignIn = async (e: FormEvent) => {
		e.preventDefault()
		if (!isLoaded || !signIn || loading) return 
	
		setLoading(() => true)
		resetErrors()
		const [signInAttempt, clerkSignInErrors] = await trySignIn({
			identifier,
			password
		})

		if (clerkSignInErrors) {
			clerkSignInErrors.forEach(({ 
				message,
				meta
			}) => {
				if (meta?.paramName === 'password') {
					setPasswordError(() => message)
				} else if (meta?.paramName === 'identifier') {
					setIdentifierError(() => message)
				}
			})
			setLoading(() => false)
			return
		}

		if (signInAttempt && signInAttempt.status === 'complete') {
			setActive({ session: signInAttempt.createdSessionId })
		}

		setLoading(() => false)
	}

	return (
		<form onSubmit={handleSignIn}>
			<div>
				<input
					placeholder='Email or username'
					type='text' value={identifier}
					onChange={e => {
						setIdentifier(e.target.value)
						setIdentifierError(() => '')
					}}
					required
				/>
				{ identifierError && <p>{identifierError}</p> }
			</div>
			<div>
				<input
					placeholder='password'
					type='password' value={password}
					onChange={e => {
						setPassword(e.target.value)
						setPasswordError(() => '')
					}}
					required
				/>
				{ passwordError && <p>{passwordError}</p> }
			</div>
			<button type='submit'>
				<div>
					{ loading ?  <Spinner /> : 'Sign in' }
				</div>
			</button>
		</form>
	)
}