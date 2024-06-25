import axios from 'axios';
import { Alert, Button, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CommentBox from './CommentBox';
import HandleModal from './shareComponents/HandleModal';

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const res = await axios.post('/api/comments/create', {
        content: comment,
        postId,
        userId: currentUser.rest?._id,
      });
      if (!res.statusText === 'OK') {
        setCommentError('failed to comment');
      }
      const data = await res.data.newComment;
      setComment('');
      setCommentError(null);

      // show comments imitate
      setComments([data, ...comments]);
    } catch (error) {
      setCommentError(error.message);
    }
  };

  // get comments from api
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `/api/comments/get-post-comments/${postId}`
        );
        if (!res.statusText === 'OK') {
          setCommentError('failed to get comments');
        }

        const data = await res.data;
        setComments(data.comments);
      } catch (error) {
        setCommentError(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sing-in');
        return;
      }
      const res = await axios.put(`/api/comments/likeComment/${commentId}`);

      if (!res.statusText === 'OK') {
        setCommentError('failed to like comment');
      }
      const data = await res.data;
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? {
                ...comment,
                likes: data.comment.likes,
                numberOfLikes: data.comment.likes.length,
              }
            : comment
        )
      );
    } catch (error) {
      setCommentError(error.message);
    }
  };

  const handleEdit = (targetComment, newContent) => {
    setComments(
      comments.map((comment) =>
        comment._id === targetComment._id
          ? { ...comment, content: newContent }
          : comment
      )
    );
  };

  const handleDeleteComment = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sing-in');
        return;
      }
      const res = await axios.delete(
        `/api/comments/deleteComment/${commentId}`
      );
      if (res.statusText === 'OK') {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setShowModel(false);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className=" max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Singed in as:</p>
          <img
            src={currentUser?.rest.profilePic}
            className="h-5 w-5 rounded-full"
          />
          <Link
            to={'/dashboard?tab=profile'}
            className=" text-xs text-cyan-600 hover:underline"
          >
            @{currentUser?.rest.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm text-teal-500 my-5 flex gap-1 ">
          You must ber sign in to comment:
          <Link className=" text-blue-600 hover:underline" to={'/sign-in'}>
            SignIn
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3 "
        >
          <Textarea
            rows={4}
            maxLength={200}
            placeholder="Add a comment here..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 tex-xs">
              {200 - comment.length} character remaining
            </p>
            <Button gradientDuoTone="purpleToBlue" outline type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment yet!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <p>Comments:</p>
            <div className="border border-x-gray-400 py-1 px-3 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <CommentBox
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModel(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <HandleModal
        showModel={showModel}
        setShowModel={setShowModel}
        handleDeleteComment={handleDeleteComment}
        commentToDelete={commentToDelete}
        title={`comment`}
      />
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentSection;
