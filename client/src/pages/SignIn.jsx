import axios from 'axios';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/user/userSlice.js';

import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';

const SingIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errormessage } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password)
      return dispatch(signInFailure('Please fill all the fields'));

    try {
      dispatch(signInStart());
      const res = await axios.post('/api/auth/sing-in', formData);

      const data = res.data.rest;
      if (!res.statusText === 'OK') {
        dispatch(signInFailure(data.message));
      }
      dispatch(signInSuccess(data));
      navigateTo('/');
    } catch (error) {
      dispatch(signInFailure(error.response.data.message));
    }
  };

  return (
    <main className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="py-1 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Dnyan
            </span>
            Blog
          </Link>
          <p className=" text-sm mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* left side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="dnyan@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  (<Spinner size="sm" />{' '}
                  <span className="pl-3">Loading...</span>)
                </>
              ) : (
                'sing in'
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errormessage && (
            <Alert className="mt-5" color="failure">
              {errormessage}
            </Alert>
          )}
        </div>
      </div>
    </main>
  );
};

export default SingIn;
