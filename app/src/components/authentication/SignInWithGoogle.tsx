import { useSignIn, useSignUp} from '@clerk/nextjs'
import { useRouter } from 'next/router'
import {
	// authenticatePaths,
	authModeMap
} from './Authenticate';

export const SignInWithGoogleButton = () => {
	const { signIn } = useSignIn()
	// const { signUp } = useSignUp()
	const router = useRouter()

  	const handleSignInWithGoogle = async () => {
		if (signIn && router.isReady) {
			try {
				await signIn.authenticateWithRedirect({
					strategy: 'oauth_google',
					// redirectUrl: authenticatePaths.oAuthRedirectUrl,
					redirectUrl: `${router.pathname}?a=${authModeMap.oAuthRedirect.queryValue}`,
					redirectUrlComplete: router.pathname, // Redirect to the current URL after completion
				});
			} catch (error) {
				console.error('Error during sign in with Google:', error);
			}
		} else {
			console.log('signIn instance is unavailable')
		}
	};

	return (
		<button onClick={handleSignInWithGoogle}>
			Continue with Google
		</button>
	);
};

