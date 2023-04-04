import { FC, FormEvent, useState, useLayoutEffect, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSignUp, useClerk } from '@clerk/nextjs'
import { SignUpCreateParams, SignUpResource, ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'
import { setAuthMode, authModeMap, getAuthMode } from './Authenticate'

export const OAuthContinueForm: FC = () => {
	const router = useRouter()
	const { isLoaded, signUp, setActive } = useSignUp()
	// const { handleRedirectCallback } = useClerk()
	// const mode = getAuthMode(router)

	// const [callbackError, setCallbackError] = useState<string>('')

	const [username, setUsername] = useState<string>('')
	const [usernameError, setUsernameError] = useState<string>('')

	const [loading, setLoading] = useState<boolean>(false)

	// could make this into a util - pass in a sign up object
	const trySignUp = async (params: SignUpCreateParams): Promise<[SignUpResource | null, ClerkAPIError[] | null | string]> => {
		if (!signUp) return [null, 'Clerk sign up not available']
		
		try {
			const signUpUpdate = await signUp.update(params)
			return [signUpUpdate, null]
		} catch (e: any) {
			return [signUp, (e.errors as ClerkAPIError[])]
		}
	}

	const onCompleteHandler = async (e: FormEvent) => {
		e.preventDefault()
		if (!signUp || loading || !isLoaded) return

		setLoading(() => true)
		const [updateUsername, errors] = await trySignUp({ username })

		if (errors) {
			if (typeof errors === 'string') { 
				setUsernameError(errors)
			} else {
				setUsernameError(() => errors.map(err => err.message).join(', '))
			}
			setLoading(() => false)
			return
		}

		if (updateUsername && updateUsername.status === 'complete') {
			setActive({ session: updateUsername.createdSessionId })
			setAuthMode(null, router)
			setLoading(() => false)
			return
		}

		setLoading(() => false)
	}

	return (
		<form onSubmit={onCompleteHandler}>
			<div>
				<input
					placeholder='Username'
					type='text'
					value={username}
					onChange={e => {
						setUsername(e.target.value)
						setUsernameError(() => '')
					}}
					required
				/>
				{ usernameError && <p>{usernameError}</p> }
			</div>
			<button type='submit'>
				<div>
					{ loading ?  <Spinner /> : 'Complete' }
				</div>
			</button>
		</form>
	)
}