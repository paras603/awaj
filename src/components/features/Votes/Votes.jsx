import { usePostVoting } from '../../../hooks/usePostVoting';
import { UpvoteFilledIcon } from '../../ui/UpvoteFilledIcon';
import { UpvoteOutlineIcon } from '../../ui/UpvoteOutlineIcon';
import { DownVoteFilledIcon } from '../../ui/DownVoteFilledIcon';
import { DownVoteOutlineIcon } from '../../ui/DownVoteOutlineIcon';

export function Votes ({post, authUser}) {

    const { localVoteScore, localVoteStatus, handleUpvote, handleDownvote } = usePostVoting({post, authUser});
    
    return (
        <div className="flex flex-col items-center text-gray-400">
            <div onClick={handleUpvote}>
              {localVoteStatus === '1' ? <UpvoteFilledIcon /> : <UpvoteOutlineIcon   />}
            </div>
            
            <span className="font-semibold text-sm text-gray-500">
              {localVoteScore}
            </span>

            <div onClick={handleDownvote}>
              {localVoteStatus === '-1' ? <DownVoteFilledIcon /> : <DownVoteOutlineIcon />}
            </div>
        </div>
    )
}