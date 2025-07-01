import { Card } from "../../ui/Card.jsx";
import { getVoteScore, formatPostDate } from "../../../utils/posts.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Votes } from "../Votes/Votes.jsx";
import { useNavigate } from "react-router";
import { BookmarkIcon } from "../../ui/BookmarkIcon.jsx";
import { ShareIcon } from "../../ui/ShareIcon.jsx";
import { CommentIcon } from "../../ui/CommentIcon.jsx";
import { useState } from "react";
import { CreateCommentModal } from "../comments/CreateCommentModal.jsx";

export function PostItem({ post, isClickable=true }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [ openCommentModal, setOpenPostModal ] = useState(false);

  const handlePostClick = () => {
    if (isClickable){
      navigate(`/posts/${post.id}`);
    }
  };

  const handleUserProfileClick = (e) => {
    e.stopPropagation();
    alert('user profile page comming soon');
  }

  const handleCommentClick = () => {
    setOpenPostModal(true);
  }

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <>
      <li className="list-none">
        <hr className="border-t border-white/20 my-6" />
        <Card className="hover:bg-white/5 transition-colors duration-200">
          <div className="flex flex-row space-x-4">
            <Votes post={post} authUser={authUser} />
            <div>
              <div
                className={`flex-1 ${isClickable ? 'cursor-pointer' : 'cursor-text'}`}
                onClick={handlePostClick}
              >
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-1">
                  <img
                    src={user.imageUrl}
                    alt={`${post.relationships.user_name}'s profile`}
                    className="w-9 h-9 rounded-full object-cover cursor-pointer"
                    onClick={handleUserProfileClick}
                  />
                  <h2 
                    className="text-sm font-medium text-white cursor-pointer hover:underline"
                    onClick={handleUserProfileClick}
                  >
                    {post.relationships.user_name}
                  </h2>
                  <span className="text-xs text-gray-400">
                    · {formatPostDate(post.attributes.created_at)}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-gray-200 text-[15px] mb-3 leading-snug">
                  {post.attributes.content}
                </p>
              </div>

              {/* Post Actions */}
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer" onClick={handleCommentClick}>
                  <CommentIcon />
                  <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-white transition-colors">
                  <BookmarkIcon />
                  <span>0</span>
                </div>
                {/* <div className="flex items-center space-x-1 hover:text-white transition-colors">
                  <ShareIcon />
                  <span>0</span>
                </div> */}
              </div>
            </div>
          </div>
        </Card>
      </li>
      {openCommentModal && (
      <CreateCommentModal
        onClose={() => setOpenPostModal(false)}
        post={post}
        onSubmit={(newComment) => {
          // Optional: send to backend or update state
          console.log("Comment submitted:", newComment);
        }}
      />
)}

    </>
  );
}
