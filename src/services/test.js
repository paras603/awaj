import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";


export async function getProfilePictures(){
    try{
        const response = await fetch(`${API_BASE}/allProfilePictures`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getToken()}`,
            }
        });

        if(!response.ok){
            const errorData = await response.json();
            return errorData;
        }

        const data = await response.json();
        console.log(data,'skldfjl'
        )
        return data;

    }catch(error){
        console.log(error);
        return error;
    }
}