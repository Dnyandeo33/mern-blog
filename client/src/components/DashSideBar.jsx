import axios from 'axios';
import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice.js';
const DashSideBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');

    tabFromUrl && setTab(tabFromUrl);
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await axios.post('api/users/sign-out');
      const data = res.data;
      if (!res.ok) {
        console.log(data.message);
      }
      dispatch(signOutSuccess());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to={'/dashboard?tab=profile'}>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={'User'}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
