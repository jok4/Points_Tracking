import React, {useEffect} from 'react';
import { initializeGoogleSignIn, handleGoogleSignIn } from './googleSignIn';


function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await initializeGoogleSignIn();
      const idToken = await handleGoogleSignIn();
      console.log('Signed in successfully. ID Token:', idToken);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  useEffect(() => {
    initializeGoogleSignIn();
  }, []);

  return (
    <button onClick={signInWithGoogle}>
      Sign In with Google
    </button>
  );
}

export default SignInButton;