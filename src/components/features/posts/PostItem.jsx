import { Card } from "../../ui/Card.jsx";
import { formatPostDate } from "../../../utils/posts.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { Votes } from "../Votes/Votes.jsx";
import { useNavigate } from "react-router";
import { PostActions } from "./PostActions.jsx";
import { useEffect, useState } from "react";
import { PostImage } from "./postImage.jsx";

export function PostItem({ post, isClickable = true, hideActions = false }) {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);


  const handlePostClick = () => {
    if (isClickable && !selectedImage) {
      navigate(`/posts/${post.id}`);
    }
  };

  const handleUserProfileClick = (e) => {
    e.stopPropagation();
    alert('user profile page coming soon');
  };

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

              {/* Post Images */}
              <PostImage images={post.attributes.image_urls} />           

            </div>

            {/* Post Actions */}
            {!hideActions && (
              <PostActions post={post}  />
            )}

            
          </div>
        </div>

              {/* Optional Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      </Card>

    </>
  );
}
