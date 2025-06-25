import { useState } from 'react';
import { createInteraction, upvotePost, downvotePost, removeVote } from "../services/interaction.js";
import { getVoteScore } from "../utils/posts.js";

export function usePostVoting({post, authUser}) {
    const [ localVoteStatus, setLocalVoteStatus ] = useState(() => {
    const userInteraction = post.userInteractions?.find(
      (interaction) => String(interaction.user_id) === String(authUser.id)
    );
    return userInteraction?.attributes.vote_status;
  });

  const [ localVoteScore, setLocalVoteScore ] = useState(() => {
    return getVoteScore(post);
  });

  const handleUpvote = async () => {
    if (localVoteStatus === undefined){
       await createInteraction(
        {
          "post_id": (post.id),
          "user_id": (authUser.id), 
          "voteStatus": "1",
        }
      )
      setLocalVoteStatus("1");
      setLocalVoteScore(prev => prev + 1);
    }else if(localVoteStatus === "1"){
      await removeVote(authUser.id, post.id);
      setLocalVoteStatus("0");
      setLocalVoteScore(prev => prev - 1);
    }else{
      await upvotePost(authUser.id, post.id);
      setLocalVoteStatus("1");
      setLocalVoteScore(prev => prev + 1);
    }
  }

  const handleDownvote = async () => {
      if (localVoteStatus === undefined){
        await createInteraction(
        {
          "post_id": (post.id),
          "user_id": (authUser.id), 
          "voteStatus": "-1",
        }
      )      
      setLocalVoteStatus("-1");
      setLocalVoteScore(prev => prev - 1);
    }else if(localVoteStatus === "-1"){
      await removeVote(authUser.id, post.id);
      setLocalVoteStatus("0");
      setLocalVoteScore(prev => prev - 1);
    }else{
      await downvotePost(authUser.id, post.id);
      setLocalVoteStatus("-1");
      setLocalVoteScore(prev => prev - 1);
    }
  }

  return { localVoteScore, localVoteStatus, handleUpvote, handleDownvote };

}
