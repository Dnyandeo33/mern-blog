import axios from 'axios';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../firebase.js';
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from '../redux/user/userSlice.js';

const DashProfile = () => {
  // get currentUser
  const { currentUser } = useSelector((state) => state.user);
  // state of image
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  // redux method
  const dispatch = useDispatch();

  // used Hook for file reference
  const fileRef = useRef();

  // handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    file && setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  // use Hook for changing imageFile
  useEffect(() => {
    imageFile && uploadImage();
  }, [imageFile]);

  // create function for upload image
  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    // get storage from firebase/storage
    const storage = getStorage(app);
    // create unique file name
    const fileName = new Date().getTime() + imageFile.name;
    // give the reference filename to storage
    const storageRef = ref(storage, fileName);
    // call the firebase/storage uploadBytesResumable builtUp function pass the parameters storage ref and data
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    // use builtUP function
    uploadTask.on(
      'state_changed',
      // get the progress of file uploading using snapshot function
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      () => {
        // set the error if its happen
        setImageFileUploadError('Upload Fail, (File must be less then 2MB)');
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        // get url from firebase/storage using getDownloadURL function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePic: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please wait, image is uploading...');
      return;
    }

    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/users/${currentUser.rest._id}`,
        formData
      );
      const data = await res.data;
      if (!res.statusText === 'OK') {
        setUpdateUserError(data.message);
        dispatch(dispatch(updateFailure(data.message)));
      }
      dispatch(updateSuccess(data));
      setUpdateUserSuccess('Profile updated successfully...');
    } catch (error) {
      dispatch(updateFailure(error.response.data.message));
      setUpdateUserError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* input for upload image its refer to below div  */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileRef}
          hidden
        />
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}

          <img
            src={imageFileUrl || currentUser.rest.profilePic}
            alt="user"
            className={`rounded-full object-cover w-full h-full border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              'opacity-60'
            } `}
            onClick={() => fileRef.current.click()}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.rest.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.rest.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="**********"
          id="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-500 cursor-pointer">Delete Profile</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
