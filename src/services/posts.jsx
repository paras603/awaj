import { getToken } from "../auth/tokenService";

export async function getUserPosts() {
  try {
    const response = await fetch("http://awaj.test/api/posts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getAllPosts() {
  try {
    const response = await fetch("http://awaj.test/api/allPosts", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPost(formData) {
  try {
    const response = await fetch("http://awaj.test/api/posts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
