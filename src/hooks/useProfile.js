import { useCallback, useEffect, useState } from "react";
import { fetchAuthUser } from "../services/auth";
import { fetchUserProfile } from "../services/user";
import { getUserPosts, getUserSavedPosts } from "../services/posts";
import { follow, unfollow } from "../services/connection";

export function userProfile(userId){
    const [state, setState] = useState({
        authUser: null,
        profile: null,
        posts: [],
        savedPosts: [],
        loading: true,
        error: null,
        followLoading: false,
    });

    useEffect(() => {
        let mounted = true;
        
        (async () => {
            try{
                const [authRes, profileRes] = await Promise.all([
                    fetchAuthUser(),
                    fetchUserProfile(userId),
                ]);

                if(!mounted) return;

                const postsRes = await getUserPosts(profileRes.data.user.id);
                const savedPostsRes = await getUserSavedPosts();

                setState(prev => ({
                    ...prev,
                    authUser: authRes.data,
                    profile: profileRes.data,
                    posts: postsRes.data,
                    savedPosts: savedPostsRes.data,
                    loading: false,
                }));
            }catch(err){
                if(mounted){
                    setState(prev => ({
                        ...prev,
                        error: err,
                        loading: false
                    }));
                }
            }
        })();

        return () => {
            mounted = false;
        };
    }, [userId]);

    const toggleFollow = useCallback(async () => {
        if (!state.profile) return;

        const { user, isFollowing } = state.profile;

        setState(prev => ({
            ...prev,
            followLoading: true,
            profile: {
                ...prev.profile,
                isFollowing: !isFollowing,
                followerCount: isFollowing
                ? prev.profile.followerCount - 1
                : prev.profile.followerCount + 1
            }
        }));

        try {
            isFollowing ? await unfollow(user.id) : await follow(user.id);
        } catch {
            // rollback on failure
            setState(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    isFollowing,
                    followerCount: prev.profile.followerCount
                }
            }));
        } finally {
            setState(prev => ({ ...prev, followLoading: false }));
        }
    }, [state.profile]);

    return {
        ...state,
        toggleFollow
    };

}