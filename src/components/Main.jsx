import { useEffect, useState } from "react";
import { createPost, getAllPosts } from "../services/posts";
import { Card } from "./ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";
import { CreatePostModal } from "./CreatePostModal";

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
    <main className="bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mx-auto max-w-2xl py-6 rounded-md border-white/20 bg-gray-800">
        <Card>
          <div
            className="flex flex-row space-x-4"
            onClick={() => setOpenPostModal(true)}
          >
            <p className="cursor-text block w-full p-3 text-sm text-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
              Share your thoughts...
            </p>
            <button className="px-6 text-white font-medium rounded-lg text-sm focus:outline-none border cursor-pointer">
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
                    <div className="flex flex-col items-center">
                      <ArrowUpIcon
                        className="size-6 cursor-pointer"
                        aria-label="Upvote"
                      />
                      <span
                        className={`text-medium font-medium ${
                          post.attributes.upvote - post.attributes.downvote >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {post.attributes.upvote - post.attributes.downvote}
                      </span>
                      <ArrowDownIcon
                        className="size-6 cursor-pointer"
                        aria-label="Downvote"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {post.relationships.user_name}
                      </h2>
                      <p className="text-gray-300">{post.attributes.content}</p>
                    </div>
                  </div>
                  {post.comments.length > 0 &&
                    post.comments.map((comment, index) => (
                      <div
                        key={index}
                        className="flex flex-row space-x-5 mt-2 p-2"
                      >
                        <div>
                          <img
                            src="src/assets/profile.png"
                            alt="user profile"
                            className="w-7 h-7 rounded-full"
                          />
                        </div>
                        <div className="flex flex-col text-xs ">
                          <div className="font-bold">
                            <p>{comment.user.user_name}</p>
                          </div>
                          <div>
                            <p className="w-full">
                              {comment.attributes.comment}
                            </p>
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
