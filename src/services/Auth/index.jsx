import { getToken } from "../tokenService";

export async function registerUser(formData) {
    try{
        const response = await fetch(
            "http://awaj.test/api/register",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
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

export async function loginUser(formData) {
    try{
        const response = await fetch(
            "http://awaj.test/api/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
                body: formData,
            },
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

export async function logoutUser(){
    try{
        const response = await fetch(
            "http://awaj.test/api/logout",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
            }
        );

        if(!response.ok){
            const errorData = await response.json();
            throw errorData;
        }

        return response;
    }catch(error){
        console.log(error);
        return error;
    }
}