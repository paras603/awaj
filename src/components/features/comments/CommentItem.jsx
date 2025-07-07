import { formatPostDate } from "../../../utils/posts";
import { useNavigate } from "react-router-dom";
import { Card } from "../../ui/Card";
import { LikeIcon } from "../../ui/LikeIcon";
import { DislikeIcon } from "../../ui/DislikeIcon";
import { CommentCard } from "../../ui/CommentCard";
import { useState } from "react";

export function CommentItem({ comment }) {
  const navigate = useNavigate();
  const [ currentComment, setCurrentComment ] = useState(comment);

  console.log(currentComment)

  const handleUserProfileClick = (e) => {
    e.stopPropagation();
    alert('user profile page coming soon');
  }

  const user1 = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <li className="list-none">
      <hr className="border-t border-white/20 my-4" />
      <CommentCard>
          {/* Smaller avatar */}
          <img
            src={user1.imageUrl}
            alt={`${currentComment.user.user_name}'s profile`}
            className="w-7 h-7 rounded-full object-cover cursor-pointer mt-1"
            onClick={handleUserProfileClick}
          />
          <div className="flex-1">
            {/* User Info */}
            <div className="flex items-center space-x-2 mb-1">
              <h3
                className="text-xs font-semibold text-white cursor-pointer hover:underline"
                onClick={handleUserProfileClick}
              >
                {comment.user.user_name}
              </h3>
              <span className="text-[10px] text-gray-400">
                · {formatPostDate(currentComment.attributes.created_at)}
              </span>
            </div>

            {/* Comment Content */}
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {currentComment.attributes.comment}
            </p>

            {/* Post Actions */}
            <div className="flex items-center space-x-5 text-gray-400 text-xs mt-2">
              <button
                aria-label="Like comment"
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                onClick={() => alert('Like functionality coming soon!')}
                type="button"
              >
                <LikeIcon />
                <span>0</span>
              </button>
              <button
                aria-label="Dislike comment"
                className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                onClick={() => alert('Dislike functionality coming soon!')}
                type="button"
              >
                <DislikeIcon />
                <span>0</span>
              </button>
            </div>
          </div>
      </CommentCard>
    </li>
  );
}
