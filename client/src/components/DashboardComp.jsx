/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Table } from 'flowbite-react';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetchComments from '../hook/useFetchComments';
import useFetchPostsData from '../hook/useFetchPostsData';
import useFetchUsersData from '../hook/useFetchUsersData';

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { isAdmin } = currentUser;

  if (isAdmin) {
    useFetchPostsData('get-posts?limit=5');
    useFetchUsersData('get-users?limit=5');
    useFetchComments('get-all-comments?limit=5');
  }

  const posts = useSelector((state) => state.posts.posts);
  const users = useSelector((state) => state.user.allUsers);
  const comments = useSelector((state) => state.comments.comments);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl text-center">{users.totalUser}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 mt-8 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {users.lastMonthUser}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl text-center">{posts.total}</p>
            </div>
            <HiDocumentText className="bg-lime-600 mt-8 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {posts.lastMontPost}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl text-center">{comments.totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 mt-8 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {comments.lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent users</h1>
            <Button outline>
              <Link to="/dashboard?tab=users">See All</Link>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users?.users?.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Table.Cell>
                      <img
                        src={user.profilePic}
                        alt=""
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline>
              <Link to="/dashboard?tab=posts">See All</Link>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Post Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts?.posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt={post}
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline>
              <Link to="/dashboard?tab=comments">See All</Link>
            </Button>
          </div>
          <Table>
            <Table.Head>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments?.comments?.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Table.Cell className="w-[58rem]">
                      <p className=" line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
