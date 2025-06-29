import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

    useEffect(() => {
        async function fetchPost() {
            try {
                const data = await getPost(id);
                setPost(data.data);
            } catch (error) {
                console.error("Failed to load post:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-white text-center">Loading...</p>;
    if (!post) return <p className="text-white text-center">Post not found.</p>;

    return (
        <main className="bg-gray-900 min-h-screen p-6 sm:p-8 md:p-10 lg:p-12 text-white">
            <div className="mx-auto max-w-2xl py-8 px-8 sm:px-10 rounded-xl border border-white/10 bg-gray-800 shadow-lg relative">
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

                <PostItem post={post} isClickable={false} />

                <div className="mt-6">
                    <div className="flex items-center mb-6">
                        <CommentIcon className="w-5 h-5 text-gray-300 mr-2" />
                        <h3 className="text-lg font-semibold text-white">Comments</h3>
                        <span className="ml-2 text-gray-400 text-sm">({post.comments.length})</span>
                    </div>

                    {post.comments.length > 0 ? (
                        <ul className="space-y-4">
                            {post.comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 text-sm text-center">No comments yet.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
