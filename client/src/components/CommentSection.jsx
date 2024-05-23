import axios from 'axios';
import { Alert, Button, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CommentSection = ({ postId }) => {
  const currentUser = useSelector((state) => state.user);
  const user = currentUser?.currentUser?.rest;
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await axios.post('/api/comments/create', {
        comment,
        postId,
        userId: user?._id,
      });
      const data = await res.data;
      if (res.ok) {
        setComment('');
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  return (
    <div className=" max-w-2xl mx-auto w-full p-3">
      {user ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Singed in as:</p>
          <img src={user?.profilePic} className="h-5 w-5 rounded-full" />
          <Link
            to={'/dashboard?tab=profile'}
            className=" text-xs text-cyan-600 hover:underline"
          >
            @{user?.username}
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
      {user && (
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
    </div>
  );
};

export default CommentSection;
