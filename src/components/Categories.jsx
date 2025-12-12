// Categories.jsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate, categories } = useContext(AppContext);

  const handleCategoryClick = (cat) => {
    if (!cat || !cat.name) {
      navigate("/menu");
      return;
    }

    // Pass the category name as a query param so Menu page can filter
    const categoryParam = encodeURIComponent(cat.name.trim());
    navigate(`/menu?category=${categoryParam}`);
  };

  const hasCategories = Array.isArray(categories) && categories.length > 0;

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = hasCategories ? categories.length : 0;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = hasCategories
    ? categories.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Explore Our <span className="text-yellow-500">Categories</span>
        </h2>
        <p>Discover delicious dishes from our carefully curated categories</p>

        {!hasCategories ? (
          <div className="mt-10 text-gray-500">
            No categories available right now. Please check back later.
          </div>
        ) : (
          <>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {currentCategories.map((cat) => (
                <div
                  key={cat._id}
                  className="cursor-pointer group"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                      <img
                        src={cat.image}
                        alt={cat.name || "Category image"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center mt-10 space-x-2">
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-50"
                  }`}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 rounded-full text-sm font-semibold border transition-colors ${
                        currentPage === page
                          ? "bg-yellow-500 text-white border-yellow-500"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-yellow-50"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Categories;
