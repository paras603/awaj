import { PhotoIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Sidebar } from '../components/Sidebar'
import { Navbar } from '../components/Navbar'
import { useEffect, useState } from 'react';
import { getUserSettingDetails, updateUserSettingDetails } from '../services/setting';
import { toast, ToastContainer } from 'react-toastify';

export function Settings(){
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);

  const [previewImageURL, setPreviewImageURL] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const userdata = await getUserSettingDetails(); 
      setUser(userdata.data);
      setOriginalUser(userdata.data);

      setUsername(userdata?.data?.username || '')
      setEmail(userdata?.data?.email || '')
      setBio(userdata?.data?.bio || '')
      setProfilePictureUrl(userdata?.data?.profile_picture_url || '')
    }
    fetchData();
  }, [])

  useEffect(() => {
    return () => {
      if (previewImageURL) {
        URL.revokeObjectURL(previewImageURL);
      }
    };
  }, [previewImageURL]);

  async function handleSubmit(e){
    e.preventDefault();

    const formData = new FormData();

    if (username!=originalUser.username) formData.append('username', username);
    if (email!=originalUser.email) formData.append('email', email);
    if (bio!=originalUser.bio) formData.append('bio', bio);
    if (selectedFile) formData.append('latest_profile_picture',selectedFile);

    const res = await updateUserSettingDetails(formData);

    if (res?.data) {
      toast.success('Profile updated successfully');

      setUser(res.data);
      setOriginalUser(res.data);
      setProfilePictureUrl(res.data.profile_picture_url);
      setPreviewImageURL(null);
      setSelectedFile(null);
    } else {
      toast.error('Update failed');
    }
  }

  const hasChanges =
    username !== originalUser?.username ||
    email !== originalUser?.email ||
    bio !== originalUser?.bio ||
    selectedFile;

    return(
      <>
      <Navbar user={user}/>
      <div className="my-10 mx-10 md:mx-70">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
    
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">awaj.com/</div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                    About
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
                </div>
    
                <div className="col-span-full">
                  <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    {previewImageURL ? (
                      <img
                        src={previewImageURL}
                        alt='Profile Preview'
                        className="h-36 w-36 rounded-full object-cover"
                      />
                    ) : profilePictureUrl ? (
                      <img
                        src={profilePictureUrl}
                        alt="Profile"
                        className="h-36 w-36 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon aria-hidden="true" className="h-36 w-36 text-gray-300" />
                    )}
                    
                    <label className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if(file){
                              setSelectedFile(file)
                              setPreviewImageURL(URL.createObjectURL(file));
                            }
                          }
                        }
                        className="hidden"
                      />
                    </label>

                  </div>
                </div>
              </div>
            </div>
    
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
    
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
    
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                We'll always let you know about important changes, but you pick what else you want to hear about.
              </p>
            </div>
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              disabled={!hasChanges}
              className={`
                rounded-md px-3 py-2 text-sm font-semibold text-white shadow-xs
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                ${hasChanges
                  ? 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
                }
              `}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
      </>
  )
}
