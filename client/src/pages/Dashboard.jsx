import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashComments from '../components/DashComments';
import DashPosts from '../components/DashPost';
import DashProfile from '../components/DashProfile';
import DashSideBar from '../components/DashSideBar';
import DashUsers from '../components/DashUser';
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromUrl = searchParams.get('tab');

    tabFromUrl && setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* sidebar */}
        <DashSideBar />
      </div>
      {/* Profile */}
      {tab === 'profile' && <DashProfile />}
      {/* Post */}
      {tab === 'posts' && <DashPosts />}
      {/* User */}
      {tab === 'users' && <DashUsers />}
      {tab === 'comments' && <DashComments />}
    </div>
  );
};

export default Dashboard;
