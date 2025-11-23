import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { PostImage } from "../components/features/posts/postImage";
import { PostItem } from "../components/features/posts/PostItem";
import { useParams } from "react-router";
import { fetchUserProfile } from "../services/user";
import { getUserPosts } from "../services/posts";
import { fetchAuthUser } from "../services/auth";

export function Profile() {
  const {userId} = useParams();

  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);


  useEffect( () => {
    (async() => {
      try{
        const authUserData = await fetchAuthUser();
        setAuthUser(authUserData.data);
        console.log('auth user id', authUserData.data.id)
        
        const userProfileData = await fetchUserProfile(userId);
        setUserProfile(userProfileData.data);
        console.log('user id, ', userProfileData.data.user.id)

        const postsData = await getUserPosts(userProfileData.data.user.id);
        setPosts(postsData.data);
        
      }catch(err){
        setError(err);
      }finally{
        setLoading(false);
      }
    }) ();
  }, [userId]);

  if(loading) return <div>Loading...</div>;
  if(error) return <div>404. Page not found</div>;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-sky-200 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-gray-500 h-48">
            <div className="absolute -bottom-12 left-8 flex items-end">
              <img
                src={userProfile.user.profile_picture_url}
                alt={userProfile.user.username}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              
              {/* Left: Username + Email */}
              <div>
                <h2 className="text-2xl font-semibold">{userProfile.user.username}</h2>
                <p className="text-gray-500">{userProfile.user.email}</p>
              </div>

              {authUser.id !== userProfile.user.id && (
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto"
                >
                  Follow
                </button>
              )}

            </div>

            {/* Stats */}
            <div className="flex justify-around text-center mt-6 border-t pt-6">
              <div>
                <p className="text-xl font-semibold">{userProfile.user.aura}</p>
                <p className="text-gray-500 text-sm">Aura</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{userProfile.followerCount}</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{userProfile.followingCount}</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {/* Bio */}
            { userProfile.user?.bio?.trim() && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="italic">{userProfile.user.bio}</p>
                </div>
              </div>
            )}

            {/* Photos */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Recent Photos</h3>
                <a href="#" className="text-gray-500 text-sm">
                  Show all
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {userProfile.user.profile_pictures.length === 0 ? (
                  <p>No photos to show</p>
                ) : (
                  userProfile.user.profile_pictures.map((picture) => (
                    <img 
                      key={picture.id}
                      src={picture.image}
                      alt="user profile picture"
                      className="rounded-lg w-full h-40 object-cover"
                    />
                  ))
                )}
              </div>
            </div>

            {/* Posts */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Recent Posts</h3>
                <a href="#" className="text-gray-500 text-sm">
                  Show all
                </a>
              </div>

              {posts.length === 0 ? (
                <p>No posts to show</p>
              ) : (
                <ul className="space-y-4 bg-gray-600 rounded-lg">
                  {posts.map((post) => (
                    <div key={post.id}>
                      <hr className="border-t border-white/20 my-4" />
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
  )
}
