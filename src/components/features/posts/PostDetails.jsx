import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { CloseIcon } from "../../ui/CloseIcon.jsx";
import { Card } from "../../ui/Card.jsx";
import { Votes } from "../Votes/Votes.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getVoteScore, formatPostDate } from "../../../utils/posts.js";
import { getPost } from "../../../services/posts.js";
import { PostItem } from './PostItem.jsx';
import { ArrowLeftCircleIcon } from '../../ui/ArrowLeftCircleIcon.jsx';
import { EllipsisVerticalIcon } from '../../ui/EllipsisVerticalIcon.jsx';
import { CommentItem } from '../comments/CommentItem.jsx';
import { CommentIcon } from '../../ui/CommentIcon.jsx';

export function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const authUser = useAuth();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
  console.log('[PostDetails] comments:', comments);
}, [comments]);


    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPost(id);
                setPost(data.data);
                 setComments(data.data.comments || []);
            } catch (error) {
                console.error("Failed to load post:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

const [scrolled, setScrolled] = useState(false);
const scrollRef = useRef(null);

useEffect(() => {
    const handleScroll = () => {
        if (!scrollRef.current) return;
        setScrolled(scrollRef.current.scrollTop > 0);
    };

    const node = scrollRef.current;
    if (node) node.addEventListener('scroll', handleScroll);

    return () => {
        if (node) node.removeEventListener('scroll', handleScroll);
    };
}, []);

    
    if (loading) return <p className="text-white text-center">Loading...</p>;
    if (!post) return <p className="text-white text-center">Post not found.</p>;

    return (
        <main className="bg-gray-900 min-h-screen p-6 sm:p-8 md:p-10 lg:p-12 text-white">
            <div className='mx-auto max-w-2xl'>
                <div className='sticky top-0 bg-gray-900 z-10 px-8 sm:px-10 py-4'>
                    <div className="flex justify-between w-full">
                        <button 
                            onClick={() => navigate(-1)}
                            aria-label='Go Back'
                            title='Go Back'
                            className="focus:outline-none"
                        >
                            <ArrowLeftCircleIcon />
                        </button>
                        <button 
                            onClick={() => alert('functionality coming soon')}
                            aria-label='More Options'
                            title='More Options'
                            className="focus:outline-none"
                        >
                            <EllipsisVerticalIcon />
                        </button>
                    </div>
                </div>
                <div 
                    ref={scrollRef}
                    className="h-[80vh] overflow-y-auto rounded-xl border border-white/10 bg-gray-800 shadow-lg relative"
                >
                    {/* content here */}
                        {/* Top edge glow effect when scrolled */}
                    {scrolled && (
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none z-10" />
                    )}
                    <div className=" py-8 px-8 sm:px-10 rounded-xl relative">

                        <PostItem post={post} isClickable={false}  comments={comments} setComments={setComments}/>

                        <div className="mt-6">
                            <div className="flex items-center mb-6">
                                <CommentIcon className="w-5 h-5 text-gray-300 mr-2" />
                                <h3 className="text-lg font-semibold text-white">Comments</h3>
                                <span className="ml-2 text-gray-400 text-sm">({comments.length})</span>
                            </div>

                            {(comments.length || 0) > 0 ? (
                                <ul className="space-y-4">
                                    {comments.map((comment) => (
                                        // <CommentItem key={comment.id} comment={comment} />
                                        <CommentItem key={comment.id} comment={comment} />
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 text-sm text-center">No comments yet.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
