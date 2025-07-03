import { useState, useEffect } from "react";
import { CommentIcon } from "../../ui/CommentIcon";
import { BookmarkIcon } from "../../ui/BookmarkIcon";
import { CreateCommentModal } from "../comments/CreateCommentModal";

export function PostActions({post}){

    const [ openCommentModal, setOpenCommentModal ] = useState(false);

    const handleCommentClick = () => {
        setOpenCommentModal(true);
    }

      // 🔒 Lock body scroll when modal is open
    useEffect(() => {
        if (openCommentModal) {
        document.body.classList.add("overflow-hidden");
        } else {
        document.body.classList.remove("overflow-hidden");
        }

        // Ensure scroll is unlocked if component unmounts
        return () => {
        document.body.classList.remove("overflow-hidden");
        };
    }, [openCommentModal]);

    return (
        <>
            <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer" onClick={handleCommentClick}>
                    <CommentIcon />
                    <span>{post.comments.length}</span>
                </div>
                <div className="flex items-center space-x-1 hover:text-white transition-colors">
                    <BookmarkIcon />
                    <span>0</span>
                </div>
            </div>
            {openCommentModal && (
                <CreateCommentModal
                onClose={() => setOpenCommentModal(false)}
                post={post}
                onSubmit={(newComment) => {
                    console.log("Comment submitted:", newComment);
                }}
                />
            )}
        </>

    )
}