import { useEffect, useState } from "react";
import { createPost, getAllPosts } from "../services/posts";
import { Card } from "./ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { CreatePostModal } from "./CreatePostModal";
import { UpvoteOutlineIcon } from "./ui/UpvoteOutlineIcon.jsx";
import { DownVoteOutlineIcon } from "./ui/DownVoteOutlineIcon.jsx";

export function Main() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPostModal, setOpenPostModal] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getAllPosts();
      setPosts(response.data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) return <p className="text-gray-500">Loading posts...</p>;

  return (
    <main className="bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 ">
      <div className="mx-auto max-w-2xl py-6 rounded-lg border border-white/20 bg-gray-800">
        <Card>
          <div
            className="flex flex-row "
            onClick={() => setOpenPostModal(true)}
          >
            <img
              src="src/assets/profile.png"
              alt="user profile"
              className="w-10 h-10 rounded-full"
            />
            <p className="cursor-text block w-full p-3 text-sm text-gray-500 bg-gray-800">
              Share your thoughts...
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
              Post
            </button>
          </div>
        </Card>

        {openPostModal && (
          <CreatePostModal
            openPostModal={openPostModal}
            setOpenPostModal={setOpenPostModal}
            setPosts={setPosts}
          />
        )}

        {posts.length === 0 ? (
          <p>No posts to show</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post, index) => (
              <li key={post.id}>
                <hr className="border-t border-white/20 my-4" />
                <Card>
                  <div className="flex flex-row space-x-5">
                    <div className="flex flex-col items-center text-gray-400">
                      <UpvoteOutlineIcon />
                      <span className="font-semibold text-sm text-gray-500">
                        {post.attributes.upvote - post.attributes.downvote}
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
                      <p className="text-gray-300 mt-1">
                        {post.attributes.content}
                      </p>
                    </div>
                  </div>

                  {post.comments.length > 0 &&
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
                    ))}
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
