import { useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';

export function PostImage({ images }) {
  useEffect(() => {
    console.log("Post images:", images);
  }, [images]);

  if (!images || images.length === 0) return null;

  const stopClickPropagation = (e) => {
    e.stopPropagation(); // Prevent parent click
  };

  return (
    <PhotoProvider>
      <div className="w-full max-h-96 overflow-hidden rounded-lg mb-6" onClick={stopClickPropagation}>
        {images.length === 1 && (
          <div className="w-full h-96">
            <PhotoView src={images[0]}>
              <img
                src={images[0]}
                alt="Post image"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
              />
            </PhotoView>
          </div>
        )}

        {images.length === 2 && (
          <div className="flex h-96 space-x-2">
            {images.slice(0, 2).map((url, idx) => (
              <div key={idx} className="w-1/2">
                <PhotoView src={url}>
                  <img
                    src={url}
                    alt={`Post image ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </PhotoView>
              </div>
            ))}
          </div>
        )}

        {images.length === 3 && (
          <div className="flex h-96 space-x-2">
            <div className="w-1/2">
              <PhotoView src={images[0]}>
                <img
                  src={images[0]}
                  alt="Post image 1"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                />
              </PhotoView>
            </div>
            <div className="w-1/2 flex flex-col space-y-2">
              {images.slice(1, 3).map((url, idx) => (
                <div key={idx} className="h-1/2">
                  <PhotoView src={url}>
                    <img
                      src={url}
                      alt={`Post image ${idx + 2}`}
                      className="w-full h-full object-cover rounded-lg cursor-pointer"
                    />
                  </PhotoView>
                </div>
              ))}
            </div>
          </div>
        )}

{images.length >= 4 && (
  <div className="grid grid-cols-2 grid-rows-2 gap-2 h-96">
    {images.slice(0, 4).map((url, idx) => {
      const isLast = idx === 3;
      const extraCount = images.length - 4;

      return (
        <div key={idx} className="relative w-full h-full">
          <PhotoView src={url}>
            <div className="relative w-full h-full cursor-pointer">
              <img
                src={url}
                alt={`Post image ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {isLast && extraCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold rounded-lg">
                  +{extraCount}
                </div>
              )}
            </div>
          </PhotoView>
        </div>
      );
    })}
  </div>
)}



      </div>
    </PhotoProvider>
  );
}
