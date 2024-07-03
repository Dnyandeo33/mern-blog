import axios from 'axios';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase.js';
import { signInSuccess } from '../redux/user/userSlice.js';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const auth = getAuth(app);

  // handleGoogleClick function
  const handleGoogleClick = async () => {
    // Create a new GoogleAuthProvider instance
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Sign in with Google popup
      const resultFromGoogle = await signInWithPopup(auth, provider);

      // Extract user information
      const { displayName, email, photoURL } = resultFromGoogle.user;

      // Post user info to your API
      const res = await axios.post('/api/auth/google', {
        name: displayName,
        email: email,
        googlePhotoUrl: photoURL,
      });

      if (res.status === 200) {
        // Check for successful response
        dispatch(signInSuccess(res.data));
        navigateTo('/');
      } else {
        console.error('Error from server:', res.statusText);
        alert('There was an issue during sign-in. Please try again.');
      }
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('The user closed the popup window.');
        alert('The sign-in process was interrupted. Please try again.');
      } else {
        console.error('An error occurred during sign-in:', error);
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Button type="button" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="h-6 w-6 m-r-2" />
      <span className="text-blue-500">Continue With Google</span>
    </Button>
  );
};

export default OAuth;
