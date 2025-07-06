import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";

export async function createComment(formData) {
    try{
        const response = await fetch(`${API_BASE}/posts`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(formData),
        });

        if(!response.ok){
            const errorData = await response.json();
            return errorData;
        }

        const data = await response.json();
        return data;

    }catch (error){
        console.log(error);
        return error;
    }
}