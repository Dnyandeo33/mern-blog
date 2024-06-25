import axios from 'axios';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import HandleModal from './shareComponents/HandleModal';

const DashUser = () => {
  const currentUser = useSelector((state) => state.user);
  const { isAdmin } = currentUser.currentUser.rest;
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/users/get-users`);
      const data = await res.data;
      if (res.statusText === 'OK') {
        setUsers(data.users);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleShowMore = async () => {
    const startIndex = users.length;
    const res = await axios.get(
      `/api/users/get-users?startIndex=${startIndex}`
    );

    if (res.statusText === 'OK') {
      setUsers((prev) => [...prev, ...res.data.users]);
      if (res.data.users.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    try {
      const res = await axios.delete(`/api/users/${deleteUserId}`);
      const data = await res.data;
      if (!res.statusText === 'OK') {
        console.log(data.message);
      }
      setUsers((prev) => prev.filter((user) => user._id !== deleteUserId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {isAdmin ? (
        <>
          <Table hoverable className="shadow-lg">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className=" divide-y" key={user._id}>
                <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePic}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full bg-gray-400"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className=" text-green-500" />
                    ) : (
                      <FaTimes className=" text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setDeleteUserId(user._id);
                      }}
                      className=" font-medium cursor-pointer text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You Have No User Yet!</p>
      )}

      <HandleModal
        showModel={showModel}
        setShowModel={setShowModel}
        handleDeleteComment={handleDeleteUser}
        handleTo={''}
        title={`user`}
      />
    </div>
  );
};

export default DashUser;
