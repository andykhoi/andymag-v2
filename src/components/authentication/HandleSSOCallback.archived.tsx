import { FC, useEffect, useState } from 'react'
import { useClerk } from '@clerk/nextjs'
import { ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'
import { authenticatePaths } from './Authenticate'

/* Not being used */

export const HandleSSOCallback: FC = () => {
	const { handleRedirectCallback } = useClerk()
	const [callbackError, setCallbackError] = useState<string>('')

	useEffect(() => {
		const tryHandleRedirectCallback = () => {
			try {
				handleRedirectCallback({
					continueSignUpUrl: authenticatePaths.continueOAuthSignUp
				})
			} catch (e) {
				const errors = (e as any).errors as ClerkAPIError[]
				setCallbackError(() => errors.map(err => err.message).join(', '))
			}
		}
		tryHandleRedirectCallback()
	}, [handleRedirectCallback])

	return (
		<div>
			<p>Preparing your account</p>
			{ callbackError && <p>{ callbackError }</p>}
			<Spinner />
		</div>
	)
}