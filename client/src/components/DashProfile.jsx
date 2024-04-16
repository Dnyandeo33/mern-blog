import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center font-semibold text-3xl my-7">Profile</h1>
      <form className="flex flex-col gap-6">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden">
          <img
            src={currentUser.rest.profilePic}
            alt="user"
            className=" rounded-full object-cover w-full h-full border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.rest.username}
        />
        <TextInput
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.rest.email}
        />
        <TextInput type="password" placeholder="**********" id="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="text-red-500 cursor-pointer">Delete Profile</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default DashProfile;
