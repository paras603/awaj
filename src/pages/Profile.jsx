import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { fetchAuthUser } from "../services/auth";
import { PostImage } from "../components/features/posts/postImage";
import { PostItem } from "../components/features/posts/PostItem";

export function Profile() {

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    (async() => {
      try{
        const data = await fetchAuthUser();
        console.log("RAW data from API: ", data.data)
        setAuthUser(data.data);
      }catch(err){
        setError(err);
      }finally{
        setLoading(false);
      }
    }) ();
  }, []);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>Error loading page!</div>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-sky-200 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-black h-48">
            <div className="absolute -bottom-12 left-8 flex items-end">
              <img
                src={authUser?.latest_profile_picture?.image}
                alt={authUser.username}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              <button className="ml-4 px-4 py-1 border border-gray-700 text-gray-700 rounded hover:bg-gray-100">
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-8 pb-8">
            <h2 className="text-2xl font-semibold">{authUser.username}</h2>
            <p className="text-gray-500">{authUser.email}</p>

            {/* Stats */}
            <div className="flex justify-around text-center mt-6 border-t pt-6">
              <div>
                <p className="text-xl font-semibold">{authUser.aura}</p>
                <p className="text-gray-500 text-sm">Aura</p>
              </div>
              <div>
                <p className="text-xl font-semibold">1026</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold">478</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {/* Bio */}
            { authUser?.bio?.trim() && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="italic">{authUser.bio}</p>
                </div>
              </div>
            )}

            {/* another section */}
            {/* <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Next section</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="italic">Web Developer</p>
                <p className="italic">Lives in New York</p>
                <p className="italic">Photographer</p>
              </div>
            </div> */}

            {/* Photos */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Recent Photos</h3>
                <a href="#" className="text-gray-500 text-sm">
                  Show all
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp",
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp",
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp",
                  "https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Recent ${i}`}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Recent Posts</h3>
                {/* <a href="#" className="text-gray-500 text-sm">
                  Show all
                </a> */}
              </div>

              {authUser.posts.length === 0 ? (
                <p>No posts to show</p>
              ) : (
                <ul className="space-y-4">
                  {authUser.posts.map((post) => (
                    <div key={post.id}>
                      <hr className="border-t border-white/20 my-4" />
                      {/* <PostItem  post={post} /> */}
                      <PostItem post={post} />
                    </div>
                  ))}
                </ul>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
