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

  // handleGoogle res function
  const handleGoogleClick = async () => {
    // get GoogleAuthProvider provider set as new provider
    const provider = new GoogleAuthProvider();

    // set as select_account customer
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // signInWithPopup, provide auth from getAuth and provider
      const resultFromGoogle = await signInWithPopup(auth, provider);

      // fetch api end point and send user info to database
      const res = await axios.post('/api/auth/google', {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        googlePhotoUrl: resultFromGoogle.user.photoURL,
      });

      const data = res.data;
      if (res.statusText === 'OK') {
        dispatch(signInSuccess(data));
        navigateTo('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button type="button" outline onClick={handleGoogleClick}>
      <AiFillGoogleCircle className="h-6 w-6 m-r-2" />
      <span className=" text-blue-500">Continue With Google</span>
    </Button>
  );
};

export default OAuth;
