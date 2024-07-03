import axios from 'axios';
import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HandleModal from './shareComponents/HandleModal';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { isAdmin } = currentUser;
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/comments/get-all-comments`);
      const data = await res.data;
      if (res.statusText === 'OK') {
        setComments(data.comments);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    const res = await axios.get(
      `/api/comments/get-all-comments?startIndex=${startIndex}`
    );

    if (res.statusText === 'OK') {
      setComments((prev) => [...prev, ...res.data.comments]);
      if (res.data.comments.length < 9) {
        setShowMore(false);
      }
    }
  };

  const handleDeleteComment = async () => {
    setShowModel(false);
    try {
      const res = await axios.delete(
        `/api/comments/deleteComment/${deleteCommentId}`
      );
      const data = await res.data;

      if (!res.statusText === 'OK') {
        console.log(data.message);
      }
      setComments((prev) =>
        prev.filter((comment) => comment._id !== deleteCommentId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-lg">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number Of Likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <Table.Body className=" divide-y" key={comment._id}>
                <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>{comment.content}</Table.Cell>
                  <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>{comment.userId}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setDeleteCommentId(comment._id);
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
        <p>You have no comments yet!</p>
      )}

      <HandleModal
        showModel={showModel}
        setShowModel={setShowModel}
        handleDeleteComment={handleDeleteComment}
        handleTo={deleteCommentId}
        title={`comment`}
      />
    </div>
  );
};

export default DashComments;
