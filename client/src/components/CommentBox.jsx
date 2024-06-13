import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CommentBox = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${comment?.userId}`);
        if (!res.statusText === 'OK') {
          throw new Error(res.statusText);
        }
        const data = await res.data;
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment.userId]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className=" flex-shrink-0 mr-3">
        <img
          className="h-10 w-10 rounded-full"
          src={user?.rest.profilePic}
          alt={user?.rest.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className=" font-bold mr-1 text-xs truncate">
            {user ? user?.rest.username : 'Anonymous'}
          </span>
          <span className=" text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className=" text-gray-500 mb-2">{comment.content}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-300 hover:text-blue-400 ${
              currentUser &&
              comment.likes?.includes(currentUser.rest._id) &&
              '!text-blue-500'
            }`}
          >
            <FaThumbsUp />
          </button>
          <p className="text-gray-500">
            {comment.numberOfLikes > 0 &&
              `${comment.numberOfLikes} ${
                comment.numberOfLikes === 1 ? 'like' : 'likes'
              }`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
