import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";

export async function createInteraction(bodyData){
    try{
        const response = await fetch(`${API_BASE}/interactions`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if(!response.ok){
            throw data;
        }

        return {success: true, data};
        
    }catch(error){
        return {success: false, error}
    }
}

async function patchInteraction(userId, postId, bodyData){
    try{
        const response = await fetch(`${API_BASE}/interactions/${userId}/${postId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();

        if(!response.ok){
            throw data;
        }

        return { success: true, data};
    }catch (error){
        return { success: false, error};
    }
}

export function upvotePost(userId, postId){
    return patchInteraction(userId, postId, {voteStatus: "1"});
}

export function downvotePost(userId, postId){
    return patchInteraction(userId, postId, {voteStatus: "-1"});
}

export function removeVote(userId, postId){
    return patchInteraction(userId, postId, {voteStatus: "0"});
}

export function bookmark(userId, postId){
    return patchInteraction(userId, postId, {isBookmarked: true});
}

export function unBookmark(userId, postId){
    return patchInteraction(userId, postId, {isBookmarked: false});
}