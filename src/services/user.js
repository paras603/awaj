import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";

export async function fetchUserProfile(id) {
    try{
        const response = await fetch(
            `${API_BASE}/users/${id}`,
            {
                method: "GET",
                headers:{
                    Accept: "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
            }
        );

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}