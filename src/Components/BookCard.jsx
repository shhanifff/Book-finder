import { useState } from "react";

function BookCard({ title, author, coverId }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition hover:cursor-pointer">
      <div className="w-32 h-44 mb-4 relative">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
        )}

        <img
          src={
            coverId
              ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
              : "https://via.placeholder.com/150x200?text=No+Cover"
          }
          alt={title}
          onLoad={() => setImgLoaded(true)}
          className={`w-32 h-44 object-cover rounded-md transition-opacity duration-700 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <h3 className="text-lg font-semibold text-center text-gray-800">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-2">{author}</p>
    </div>
  );
}

export default BookCard;
