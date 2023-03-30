import { FC, useEffect, useState } from 'react'
import { AuthenticateWithRedirectCallback, useClerk } from '@clerk/nextjs'
import { ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'
import { authModeMap } from './Authenticate'
import { useRouter } from 'next/router'

export const HandleSSOCallback: FC = () => {
	const router = useRouter()
	// const { handleRedirectCallback } = useClerk()
	// const [callbackError, setCallbackError] = useState<string>('')
	
	// useEffect(() => {
	// 	const tryHandleRedirectCallback = async () => {
	// 		try {
	// 			console.log('test')
	// 			await handleRedirectCallback({
	// 				continueSignUpUrl: `${router.pathname}?a=${authModeMap.continueOAuthSignUp.queryValue}`
	// 			})
	// 		} catch (e) {
	// 			const errors = (e as any).errors as ClerkAPIError[]
	// 			setCallbackError(() => errors.map(err => err.message).join(', '))
	// 		}
	// 	}
	// 	tryHandleRedirectCallback()
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [])

	// return (
	// 	<div>
	// 		<p>Preparing your account</p>
	// 		{ callbackError ? <p>{ callbackError }</p> : <Spinner /> }
	// 	</div>
	// )
	return (
		<div>
			<AuthenticateWithRedirectCallback continueSignUpUrl={`${router.pathname}?a=${authModeMap.continueOAuthSignUp.queryValue}`} />
			<p>Preparing your account</p>
			<Spinner />
		</div>
	)
}