import { useEffect, useState } from "react";
import { createPost, getAllPosts, getUserPosts } from "../services/posts";
import { Card } from "./ui/Card";

export function Main(){
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
                console.log(errors);
              }
              if(response.data){
                console.log(response.data);
              }
            }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Share your thoughts</h2>
            
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Your Message
              </label>
              <textarea
                id="message"
                rows="5"
                name="content"
                className="block w-full p-3 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full  px-6 py-2.5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-800"
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
              <Card>
                <li key={post.id} >
                  <h2 className="text-xl font-semibold">{post.relationships.user_name}</h2>
                  <p className="text-gray-700">{post.attributes.content}</p>
                </li>
              </Card>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}