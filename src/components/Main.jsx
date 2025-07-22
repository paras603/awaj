import { useEffect, useState } from "react";
import { Card } from "./ui/Card";
import { toast, ToastContainer } from "react-toastify";
import { CreatePostModal } from "./CreatePostModal";
import { usePosts } from "../hooks/usePosts";
import { PostItem } from "./features/posts/PostItem";
import { PostActions } from "./features/posts/PostActions";
import { PhotoIcon } from "./ui/PhotoIcon";

export function Main() {
  const [openPostModal, setOpenPostModal] = useState(false);
  const { posts, setPosts, loading } = usePosts();

  console.log(posts)


  function handlePostCreated(newPost) {
    setPosts((prev) => [newPost, ...prev]);
  }

  if (loading) return <p className="text-gray-500">Loading posts...</p>;

  return (
    <main className="bg-gray-900 p-4 sm:p-6 md:p-8 lg:p-10 ">
      <div className="mx-auto max-w-2xl py-6 rounded-lg border border-white/20 bg-gray-800">
      <Card>
        <div
          className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg cursor-pointer"
          onClick={() => setOpenPostModal(true)}
        >
          {/* Profile Image */}
          <img
            src="src/assets/profile.png"
            alt="User profile"
            className="w-10 h-10 rounded-full"
          />

          {/* Placeholder and media icon */}
          <div className="flex flex-col flex-grow">
            {/* Placeholder Text */}
            <p className="w-full p-3 text-sm text-gray-400 bg-gray-700 rounded-md">
              Share your thoughts...
            </p>

            {/* Divider */}
            {/* <hr className="my-2 border-gray-700" /> */}

            {/* Media Icon Section */}
            {/* <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <PhotoIcon className="w-5 h-5" />
              <span>Photo</span>
            </div> */}
          </div>
        </div>
      </Card>



        {openPostModal && (
          <CreatePostModal
            openPostModal={openPostModal}
            setOpenPostModal={setOpenPostModal}
            onPostCreated={handlePostCreated}
          />
        )}

        {posts.length === 0 ? (
          <p>No posts to show</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <div key={post.id}>
                <hr className="border-t border-white/20 my-4" />
                <PostItem  post={post} />
              </div>
            ))}
          </ul>
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
