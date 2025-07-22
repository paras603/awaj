import { useState, useEffect, useRef } from "react";
import { createPost, getAllPosts } from "../services/posts";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "./ui/Spinner.jsx";
import { CloseIcon } from "./ui/CloseIcon.jsx";
import { PhotoIcon } from "./ui/PhotoIcon.jsx";

export function CreatePostModal({
  openPostModal,
  setOpenPostModal,
  onPostCreated,
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [ file, setFile ] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files){
      console.log(e.target.files)
      setFile(e.target.files[0]);
    }
  }

  if (!openPostModal) return null;

  const textAreaRef = useRef();

  useEffect(() => {
    if (openPostModal && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [openPostModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('image', file);
    console.log([...formData.entries()]);
    setLoading(true);
    try {
      const response = await createPost(formData);
      console.log("response", response)
      if (response.errors) {
        toast.error(response.message);
        setLoading(false);
        return;
      }
      if (response.data) {
        const newPost = response.data;
        onPostCreated(newPost);
        toast.success("successfully posted");
        setOpenPostModal(false);
        setContent("");
      }
    } catch (e) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px] transition-opacity "
      onClick={() => setOpenPostModal(false)}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full p-6 mx-4 transform transition-all scale-100 border border-white/20"
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
            {file && <img className="h-20" src={URL.createObjectURL(file)} alt="Uploaded preview" />}
          </div>


          <div className="flex flex-col sm:flex-row items-center gap-4 text-white justify-between">
            <div className="flex-shrink-0">
              {/* <input id="file" type="file" onChange={handleFileChange}>
                <PhotoIcon className="w-8 h-8 text-gray-200" />
              </input> */}
              <label htmlFor="file" className="cursor-pointer flex items-center gap-2">
                <PhotoIcon className="w-8 h-8 text-gray-200" />
                <input
                  id="file"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <button
              type="submit"
              aria-busy={loading}
              disabled={content.trim() === "" || loading}
              className={`w-full sm:w-auto px-6 py-3 text-white font-semibold rounded-lg transition duration-200 ease-in-out
                ${
                  content.trim() === "" || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner className="w-5 h-5 animate-spin" />
                  <span>Posting...</span>
                </div>
              ) : (
                "Post"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
