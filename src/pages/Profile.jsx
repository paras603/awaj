import { Navbar } from "../components/Navbar";

const user = {
  name: "John Doe",
  email: "john@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export function Profile() {
  return (
    <>
      <Navbar user={user} />

      <div className="min-h-screen bg-sky-200 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-black h-48">
            <div className="absolute -bottom-12 left-8 flex items-end">
              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
              <button className="ml-4 px-4 py-1 border border-gray-700 text-gray-700 rounded hover:bg-gray-100">
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="mt-16 px-8 pb-8">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">New York</p>

            {/* Stats */}
            <div className="flex justify-around text-center mt-6 border-t pt-6">
              <div>
                <p className="text-xl font-semibold">253</p>
                <p className="text-gray-500 text-sm">Photos</p>
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

            {/* About */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p className="italic">Web Developer</p>
                <p className="italic">Lives in New York</p>
                <p className="italic">Photographer</p>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </>
  );
}
