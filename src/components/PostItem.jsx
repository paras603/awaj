import { Card } from "./ui/Card.jsx";
import { UpvoteOutlineIcon } from "./ui/UpvoteOutlineIcon.jsx";
import { DownVoteOutlineIcon } from "./ui/DownVoteOutlineIcon.jsx";
import { UpvoteFilledIcon } from "./ui/UpvoteFilledIcon.jsx";
import { DownVoteFilledIcon } from "./ui/DownVoteFilledIcon.jsx"
import { getVoteScore, formatPostDate } from "../utils/posts.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from 'react';
import { usePostVoting } from "../hooks/usePostVoting.js";


export function PostItem({ post }) {
  const {authUser} = useAuth();

  const { localVoteScore, localVoteStatus, handleUpvote, handleDownvote } = usePostVoting(post, authUser);


  return (
    
    <li>
      <hr className="border-t border-white/20 my-4" />
      <Card>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-col items-center text-gray-400">
            <div onClick={handleUpvote}>
              {localVoteStatus === '1' ? <UpvoteFilledIcon /> : <UpvoteOutlineIcon   />}
            </div>
            
            <span className="font-semibold text-sm text-gray-500">
              {localVoteScore}
            </span>

            <div onClick={handleDownvote}>
              {localVoteStatus === '-1' ? <DownVoteFilledIcon /> : <DownVoteOutlineIcon />}
            </div>
    
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-white">
                {post.relationships.user_name}
              </h2>
              <span className="text-xs text-gray-400">
                · {formatPostDate(post.attributes.created_at)}
              </span>
            </div>
            <p className="text-gray-300 mt-1">{post.attributes.content}</p>
          </div>
        </div>

        {/* {post.comments.length > 0 &&
                    post.comments.map((comment, index) => (
                      <div key={index} className="flex space-x-5 mt-4 ml-10">
                        <img
                          src="src/assets/profile.png"
                          alt="user profile"
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="bg-gray-700 p-2 rounded-lg text-sm text-gray-100 w-full">
                          <div className="font-semibold text-xs text-blue-400 mb-1">
                            <p>{comment.user.user_name}</p>
                          </div>
                          <div>
                            <p>{comment.attributes.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))} */}
      </Card>
    </li>
  );
}
