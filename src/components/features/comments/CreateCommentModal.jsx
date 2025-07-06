import { EllipsisVerticalCircleIcon } from "../../ui/EllipsisVerticalCircleIcon";
import { useEffect, useRef, useState } from "react";
import { PostItem } from "../posts/PostItem";
import { createComment } from "../../../services/comments";

export function CreateCommentModal({ onClose, onSubmit, post }) {
  const [comment, setComment] = useState("");
  const [ loading, setLoading ] = useState(false);
  const modalRef = useRef(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    console.log(post)
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Submit handler
const handleCommentSubmit = async (formData) => {
  setLoading(true);


  try {
    const response = await createComment(formData);
    
    if (response.errors) {
      console.error(response.message);
      // toast.error(response.message); // Optional
      return;
    }

    // You could update state with response.data if needed

    // toast.success("Successfully posted"); // Optional
  } catch (e) {
    console.error("Something went wrong!", e);
    // toast.error("Something went wrong!"); // Optional
  } finally {
    setLoading(false);
    onClose();
  }
};

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-[1px] transition-opacity"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-zinc-900 rounded-lg p-6 w-full max-w-2xl shadow-lg border border-white/20"
        ref={modalRef}
      >
        <div className="flex flex-row justify-between text-white">
            <button 
                type="button"
                onClick={onClose}
                className="text-md font-light text-white mb-4 cursor-pointer"
            >
                Cancel
            </button>
            <h2 className="text-md font-semibold text-white mb-4">Reply</h2>
            <EllipsisVerticalCircleIcon/>
        </div>
        <PostItem
            post={post}
            isClickable={false}
            hideActions={true}
        />
        
        <form onSubmit={handleCommentSubmit} className="pt-4">
          <textarea
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
