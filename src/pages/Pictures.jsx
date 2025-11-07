import { useEffect, useState } from "react";
import { getProfilePictures } from "../services/test";

export function Pictures() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    async function fetchPictures() {
      try {
        const response = await getProfilePictures();
        setPictures(response.data || []);
      } catch (error) {
        console.log("Failed to fetch profile pictures", error);
      }
    }

    fetchPictures();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Pictures</h1>

      {pictures.length === 0 ? (
        <p>No pictures found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pictures.map((pic) => (
            <div
              key={pic.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={pic.image}
                alt={`Profile ${pic.id}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600">User ID: {pic.user_id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
