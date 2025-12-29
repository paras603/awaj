import { toast } from "react-toastify";
import { getToken } from "../auth/tokenService";
import { API_BASE } from "../config/apiConfig";

export async function getUserSettingDetails(){
    try{
        const response = await fetch(`${API_BASE}/settings`,{
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getToken()}`
            },
        });

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        return data;
    }catch (err){
        // console.log(err);
        return err;
    }
}

export async function updateUserSettingDetails(formData){
    try{
        const response = await fetch(`${API_BASE}/settings`,{
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${getToken()}`
            },
            body: formData,
        });

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        const data = await response.json();
        // console.log(data)
        // toast.success('Successfully updated');
        return data;

    }catch (err){
        // console.log(err);
        toast.error('Something went wrong!');
        return err;
    }
}