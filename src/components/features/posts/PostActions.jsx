import { useState, useEffect } from "react";
import { CommentIcon } from "../../ui/CommentIcon";
import { BookmarkIcon } from "../../ui/BookmarkIcon";
import { CreateCommentModal } from "../comments/CreateCommentModal";
import { createComment } from "../../../services/comments";
import { BookmarkFilledIcon } from "../../ui/BookmarkFilledIcon";
import { useAuth } from "../../../context/AuthContext";
import { bookmark, unBookmark } from "../../../services/interaction";

export function PostActions({post}){

    const [ openCommentModal, setOpenCommentModal ] = useState(false);
    const [ comments, setComments ] = useState(post.comments || []);

    const [ bookmarkCount, setBookmarkCount ] = useState(post.attributes.total_bookmarked);
    
    const [ loading, setLoading ] = useState(false);

    const {authUser} = useAuth();

    const userInteraction = post.userInteractions?.find(
        (interaction) => String(interaction.user_id) === String(authUser?.id)
    )

    const [ isBookmarked, setIsBookmarked ] = useState(userInteraction?.attributes?.is_bookmarked ?? false);

    //todo: bookmark need to refresh without hard reload

    const handleBookmarkClick = () => {
        setIsBookmarked(!isBookmarked);
        if(isBookmarked){
            unBookmark(authUser?.id, post.id);
            setBookmarkCount(prev => Math.max(0, prev - 1));
        }else{
            bookmark(authUser?.id, post.id)
            setBookmarkCount(prev => prev + 1);
        }
    }

    const handleCommentClick = () => {
        setOpenCommentModal(true);
    }


      //  Lock body scroll when modal is open
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
                <div 
                    className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer" 
                    onClick={handleCommentClick}
                >
                    <CommentIcon />
                    <span>{comments.length}</span>
                </div>
                <div 
                    className="flex items-center space-x-1 hover:text-white transition-colors"
                    onClick={handleBookmarkClick}    
                >
                    {isBookmarked ? <BookmarkFilledIcon/> : <BookmarkIcon/>}
                    <span>{bookmarkCount}</span>
                </div>
            </div>
            {openCommentModal && (
                <CreateCommentModal
                    onClose={() => setOpenCommentModal(false)}
                    post={{ ...post, comments }}
                    setComments={setComments}
                />
            )}
        </>

    )
}