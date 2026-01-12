import { Navbar } from "../components/Navbar";
import { PostItem } from "../components/features/posts/PostItem";
import { useParams } from "react-router";
import { userProfile } from "../hooks/useProfile";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";

export function Profile() {
  const { userId } = useParams();

  const {
    authUser,
    profile,
    posts,
    savedPosts,
    loading,
    error,
    followLoading,
    toggleFollow
  } = userProfile(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>404. Page not found</div>;
  if (!authUser || !profile) return null;

  const isOwnProfile = authUser.id === profile.user.id;

  const [bookmarkedPosts, setBookmarkedPosts] = useState(savedPosts);

  const categories = [
    {
      name: 'Recent',
      posts: posts,
    },
    {
      name: 'Saved',
      posts: bookmarkedPosts,
    }
  ]




  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-sky-200 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-gray-500 h-48">
            <div className="absolute -bottom-12 left-8 flex items-end">
              <img
                src={profile.user.profile_picture_url}
                alt={profile.user.username}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">{profile.user.username}</h2>
                <p className="text-gray-500">{profile.user.email}</p>
              </div>

              {!isOwnProfile && (
                <button
                  disabled = {followLoading}
                  className={`px-4 py-2 rounded-lg transition w-full sm:w-auto
                    ${profile.isFollowing 
                      ? "border border-gray-300 text-gray-700 hover:bg-gray-100" 
                      : "bg-gray-600 text-white hover:bg-gray-700"}
                  `}
                  onClick={toggleFollow}
                >
                  {followLoading 
                    ? "Loading" 
                    : profile.isFollowing 
                      ? "Unfollow"
                      : "Follow"
                  }
                </button>
             )}
            </div>

            {/* Stats */}
            <div className="flex justify-around text-center mt-6 border-t pt-6">
              <div>
                <p className="text-xl font-semibold">{profile.user.aura}</p>
                <p className="text-gray-500 text-sm">Aura</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{profile.followerCount}</p>
                <p className="text-gray-500 text-sm">Followers</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{profile.followingCount}</p>
                <p className="text-gray-500 text-sm">Following</p>
              </div>
            </div>

            {/* Bio */}
            { profile.user?.bio?.trim() && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="italic">{profile.user.bio}</p>
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
                {profile.user.profile_pictures.length === 0 ? (
                  <p>No photos to show</p>
                ) : (
                  profile.user.profile_pictures.map((picture) => (
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

            {/* auth user saved post shows in saved post for all users profile */}

                {/* Recent and saved posts */}
            <div className="flex justify-between items-center mb-3 pt-14">
              <div className="w-full">
              <TabGroup>
                <TabList className="flex gap-4">
                  {categories.map(({name}) => (
                    <Tab 
                      key={name}
                      className="rounded-full px-4 py-1.5 text-md font-semibold text-gray-600 border border-transparent focus:outline-none data-hover:bg-gray-100 data-selected:bg-gray-200 data-selected:text-gray-900 data-selected:border-gray-300 data-selected:data-hover:bg-gray-300"
                    >
                      {name}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {categories.map(({name, posts}) => (
                    <TabPanel key={name} className="mt-4 rounded-xl bg-gray-50 p-4">
                      {posts.length === 0 ? (
                        <p>No posts to show</p>
                      ) : (
                        <ul className="space-y-4 bg-gray-600 rounded-lg">
                          {posts.map((post) => (
                            <div key={post.id}>
                              <hr className="border-t border-gray-200 my-4" />
                              <PostItem post={post} />
                            </div>
                          ))}
                        </ul>
                      )}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
