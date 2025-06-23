import { getToken } from "../auth/tokenService";

export async function upvotePost(userId, postId){
    try{
        const response = await fetch(`http://awaj.test/api/interactions/${userId}/${postId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: {
                "voteStatus": "1",
            }
        });
    
        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch (error){
        return error;
    }
}

export async function downvotePost(userId, postId){
    try{
        const response = await fetch(`http://awaj.test/api/interactions/${userId}/${postId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: {
                "voteStatus": "-1",
            }
        });
    
        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch (error){
        return error;
    }
}

export async function bookmark(userId, postId){
    try{
        const response = await fetch(`http://awaj.test/api/interactions/${userId}/${postId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: {
                "isBookmarked": true,
            }
        });
    
        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch (error){
        return error;
    }
}

export async function unBookmark(userId, postId){
    try{
        const response = await fetch(`http://awaj.test/api/interactions/${userId}/${postId}`, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: {
                "isBookmarked": false,
            }
        });
    
        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch (error){
        return error;
    }
}