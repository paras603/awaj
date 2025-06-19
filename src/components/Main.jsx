import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { CreatePostModal } from "./CreatePostModal";
import { usePosts } from "../hooks/usePosts.jsx";
import { PostItem } from "./PostItem.jsx";

export function Main() {
  const [openPostModal, setOpenPostModal] = useState(false);
  const { posts, setPosts, loading } = usePosts();

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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer">
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
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
