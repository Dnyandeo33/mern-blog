import axios from 'axios';
import { Button, Modal, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPost = () => {
  const currentUser = useSelector((state) => state.user);
  const { _id, isAdmin } = currentUser.currentUser.rest;
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [deletePostId, setDeletePostId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/posts/get-posts?userId=${_id}`);
      const data = await res.data;
      if (res.statusText === 'OK') {
        setUserPosts(data.data);
        if (data.data.length < 9) {
          setShowMore(false);
        }
      }
    };
    fetchData();
  }, [_id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    const res = await axios.get(
      `/api/posts/get-posts?userId=${_id}&startIndex=${startIndex}`
    );

    if (res.statusText === 'OK') {
      setUserPosts((prev) => [...prev, ...res.data.data]);
      if (res.data.data.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeletePost = async () => {
    setShowModel(false);
    try {
      const res = await axios.delete(
        `/api/posts/delete-post/${deletePostId}/${_id}`
      );
      const data = await res.data;
      if (!res.statusText === 'OK') {
        console.log(data.message);
      }
      setUserPosts((prev) => prev.filter((post) => post._id !== deletePostId));
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
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className=" divide-y" key={post._id}>
                <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-20 object-cover bg-gray-400"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className=" font-medium text-gray-700 dark:text-gray-300"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setDeletePostId(post._id);
                      }}
                      className=" font-medium cursor-pointer text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className=" text-teal-400 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
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
        <p>You Have No Post Yet!</p>
      )}
      <Modal
        show={showModel}
        onClose={() => setShowModel(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-center text-lg  text-gray-500 dark:text-gray-400">
              Are you sure! you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I am sure.
              </Button>
              <Button color="gray" onClick={() => setShowModel(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashPost;
