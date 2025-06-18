import { useState, useEffect, useRef } from "react";
import { createPost, getAllPosts } from "../services/posts";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "./ui/Spinner.jsx";
import { CloseIcon } from "./ui/CloseIcon.jsx";

export function CreatePostModal({ openPostModal, setOpenPostModal, setPosts }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!openPostModal) return null;

  const textAreaRef = useRef();

  useEffect(() => {
    if (openPostModal && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [openPostModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { content };
    setLoading(true);
    try {
      const response = await createPost(formData);
      if (response.errors) {
        toast.error(response.message);
        setLoading(false);
        return;
      }
      if (response.data) {
        toast.success("successfully posted");

        const refreshed = await getAllPosts();
        if (refreshed.errors) {
          toast.error(refreshed.message);
        } else {
          setPosts(refreshed.data);
        }
        setOpenPostModal(false);
        setContent("");
        setLoading(false);
      }
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={() => setOpenPostModal(false)}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 mx-4 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            New Post
          </h2>
          <button
            onClick={() => setOpenPostModal(false)}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
          >
            <CloseIcon />
          </button>
        </div>

        <form
          className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <textarea
              rows="5"
              name="content"
              value={content}
              ref={textAreaRef}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
              placeholder="Share your thoughts..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={content.trim() === "" || loading}
            className={`mt-4 w-full py-3 text-white font-semibold rounded-lg transition
                ${
                  content.trim() === "" || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                }
              `}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <Spinner />
                <span>Posting...</span>
              </div>
            ) : (
              "Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
