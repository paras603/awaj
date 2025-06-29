import { useEffect, useState } from "react";
import { createPost, getAllPosts } from "../services/posts";

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await getAllPosts();
        setPosts(response.data);
      } catch (error) {
        console.log("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, setPosts, loading };
}
