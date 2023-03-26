import { useSignIn } from '@clerk/nextjs'

const SignInWithGoogleButton = () => {
  const { signIn } = useSignIn();

  const handleSignInWithGoogle = async () => {
	if (signIn) {
		try {
			await signIn.authenticateWithRedirect({
				strategy: 'oauth_google',
				redirectUrl: '/sso-callback',
				redirectUrlComplete: window.location.pathname, // Redirect to the current URL after completion
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
      Sign in with Google
    </button>
  );
};

export default SignInWithGoogleButton;
