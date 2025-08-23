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

              {/* post image */}
              {post.attributes.image_urls && post.attributes.image_urls.length > 0 && (
                <div className="w-full max-h-96 overflow-hidden rounded-lg mb-6">
                  {post.attributes.image_urls.length === 1 && (
                    <div className="w-full h-96">
                      <img
                        src={post.attributes.image_urls[0]}
                        alt="Post image"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {post.attributes.image_urls.length === 2 && (
                    <div className="flex h-96 space-x-2">
                      {post.attributes.image_urls.slice(0, 2).map((url, idx) => (
                        <div key={idx} className="w-1/2">
                          <img
                            src={url}
                            alt={`Post image ${idx + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {post.attributes.image_urls.length === 3 && (
                    <div className="flex h-96 space-x-2">
                      <div className="w-1/2">
                        <img
                          src={post.attributes.image_urls[0]}
                          alt="Post image 1"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="w-1/2 flex flex-col space-y-2">
                        {post.attributes.image_urls.slice(1, 3).map((url, idx) => (
                          <div key={idx} className="h-1/2">
                            <img
                              src={url}
                              alt={`Post image ${idx + 2}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.attributes.image_urls.length >= 4 && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96">
                      {post.attributes.image_urls.slice(0, 4).map((url, idx) => (
                        <div key={idx} className="w-full h-full">
                          <img
                            src={url}
                            alt={`Post image ${idx + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
