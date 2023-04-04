import { FC, useEffect, useState } from 'react'
import { AuthenticateWithRedirectCallback, useClerk } from '@clerk/nextjs'
import { ClerkAPIError } from '@clerk/types'
import { Spinner } from '../Spinner'
import { authModeMap } from './Authenticate'
import { useRouter } from 'next/router'

export const HandleSSOCallback: FC = () => {
	const router = useRouter()

	return (
		<div>
			<AuthenticateWithRedirectCallback continueSignUpUrl={`${router.pathname}?a=${authModeMap.continueOAuthSignUp.queryValue}`} />
			<p>Preparing your account</p>
			<Spinner />
		</div>
	)
}