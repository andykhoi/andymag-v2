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
		// if (signUp && router.isReady) {
		// 	try {
		// 		await signUp.authenticateWithRedirect({
		// 			strategy: 'oauth_google',
		// 			redirectUrl: '/sso-callback',
		// 			// redirectUrl: '/?a=sso-callback',
		// 			redirectUrlComplete: '/', // Redirect to the current URL after completion
		// 			unsafeMetadata: {}
		// 		});
		// 	} catch (error) {
		// 		console.error('Error during sign up with Google:', error);
		// 	}
		// } else {
		// 	console.log('signUp instance is unavailable')
		// }
	};

	return (
		<button onClick={handleSignInWithGoogle}>
			Continue with Google
		</button>
	);
};

