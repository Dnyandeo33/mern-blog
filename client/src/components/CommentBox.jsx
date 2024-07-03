import PropTypes from 'prop-types';

import axios from 'axios';
import { Button, Textarea } from 'flowbite-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CommentBox = ({ comment, onLike, onEdit, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

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
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`/api/comments/editComment/${comment._id}`, {
        content: editedContent,
      });
      if (!res.statusText === 'OK') {
        throw new Error(res.statusText);
      }

      onEdit(comment, editedContent);
      setIsEditing(false);
    } catch (error) {
      console.log(error.message);
    }
  };

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

        {isEditing ? (
          <>
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={3}
              className="w-full p-2 pl-3 text-sm text-gray-700"
            />
            <div className="flex items-center text-sm gap-4 mt-2 justify-end">
              <Button
                onClick={handleSave}
                size="xs"
                className="bg-blue-400"
                type="button"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                size="xs"
                className="bg-blue-400"
                outline
                type="button"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className=" text-gray-500 mb-2">{comment.content}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-300 hover:text-blue-400 ${
                  currentUser &&
                  comment.likes?.includes(currentUser._id) &&
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
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-blue-400"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-red-400"
                      onClick={() => onDelete(comment._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

CommentBox.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CommentBox;
