import { useEffect, useState } from "react";
import { createPost, getAllPosts, getUserPosts } from "../services/posts";
import { Card } from "./ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid";

export function Main(){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchPosts(){
      const response = await getAllPosts();
      setPosts(response.data);
      setLoading(false);
    }

    fetchPosts();

  }, []);

  if(loading) return <p className="text-gray-500">Loading posts...</p>;


  return (
    <main>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:px-8 ">
        <Card>
          <form 
            className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
            action={async (formData) => {
              const response = await createPost(formData);
              if(response.errors){
                console.log(response.message);
                toast.error(response.message);
              }
              if(response.data){
                console.log(response.data);
                toast.success('successfully posted')
                const refreshed = await getAllPosts();
                setPosts(refreshed.data)
              }
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Share your thoughts</h2>
            
            <div className="mb-4">
              {/* <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label> */}
              <textarea
                id="message"
                rows="5"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={content.trim() === ""}
              className={`w-full px-6 py-2.5 text-white font-medium rounded-lg text-sm focus:outline-none
                ${
                  content.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                }`}
            >
              Post
            </button>
          </form>
        </Card>

        {posts.length === 0 ? (
          <p>No posts to show</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <Card>
                  <div className="flex flex-row space-x-5">
                    <div className="flex flex-col items-center">
                      <ArrowUpIcon className="size-6 cursor-pointer" aria-label="Upvote" />
                      <span className={`text-medium font-medium ${post.attributes.upvote - post.attributes.downvote >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {post.attributes.upvote - post.attributes.downvote}
                      </span>
                      <ArrowDownIcon className="size-6 cursor-pointer" aria-label="Downvote" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{post.relationships.user_name}</h2>
                      <p className="text-gray-700">{post.attributes.content}</p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
        
      </div>
      <ToastContainer/>
    </main>
  );
}