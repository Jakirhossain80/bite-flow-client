// Menus.jsx
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";

const Menus = () => {
  const { menus } = useContext(AppContext);

  const hasMenus = Array.isArray(menus) && menus.length > 0;

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = hasMenus ? menus.length : 0;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMenus = hasMenus
    ? menus.slice(startIndex, startIndex + ITEMS_PER_PAGE)
    : [];

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients
          </p>
        </div>

        {hasMenus ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentMenus.map((menu) => (
                <MenuCard key={menu._id} menu={menu} />
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
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No menu items available at the moment. Please check back later.
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;
