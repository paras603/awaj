import { Card } from "../../ui/Card.jsx";
import { formatPostDate } from "../../../utils/posts.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Votes } from "../Votes/Votes.jsx";
import { useNavigate } from "react-router";
import { PostActions } from "./PostActions.jsx";
import { useState } from "react";

export function PostItem({ post, isClickable=true, hideActions=false}) {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  console.log('post is ', post)

  const handlePostClick = () => {
    if (isClickable){
      navigate(`/posts/${post.id}`);
    }
  };

  const handleUserProfileClick = (e) => {
    e.stopPropagation();
    alert('user profile page comming soon');
  }

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };

  return (
    <>
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
            {/* {!hideActions && <PostActions
              post={post}
              comments={comments}
              setComments={setComments}
            />} */}

            {!hideActions && (
              <PostActions
                post={post}
              />
            )}


          </div>
        </div>
      </Card>
    </>

  );
}
