import { Card } from "./ui/Card.jsx";
import { UpvoteOutlineIcon } from "./ui/UpvoteOutlineIcon.jsx";
import { DownVoteOutlineIcon } from "./ui/DownVoteOutlineIcon.jsx";
import { getVoteScore } from "../utils/posts.js";

export function PostItem({ post }) {
  return (
    <li>
      <hr className="border-t border-white/20 my-4" />
      <Card>
        <div className="flex flex-row space-x-5">
          <div className="flex flex-col items-center text-gray-400">
            <UpvoteOutlineIcon />
            <span className="font-semibold text-sm text-gray-500">
              {getVoteScore(post)}
            </span>
            <DownVoteOutlineIcon />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-white">
                {post.relationships.user_name}
              </h2>
              <span className="text-xs text-gray-400">· 2h ago</span>
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
