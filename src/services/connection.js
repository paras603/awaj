import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";

export async function toggleFollow(userId) {
    try{
        const response = await fetch(`${API_BASE}/follow-toggle/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;

    }catch(error){
        return error.message;
    }
}

export async function follow(userId) {
    try{
        const response = await fetch(`${API_BASE}/follow/${userId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;

    }catch(error){
        return error.message;
    }
}

export async function unfollow(userId) {
    try{
        const response = await fetch(`${API_BASE}/unfollow/${userId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;

    }catch(error){
        return error.message;
    }
}