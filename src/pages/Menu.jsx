// Menu.jsx
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  // Read ?category=... from /menu?category=Something
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const allMenus = Array.isArray(menus) ? menus : [];

    let temp = allMenus;

    // Apply category filter first (if any)
    if (selectedCategory) {
      const target = selectedCategory.trim().toLowerCase();
      temp = temp.filter((menu) => {
        const catName =
          typeof menu.category === "string"
            ? menu.category
            : menu.category?.name;

        if (!catName) return false;
        return catName.trim().toLowerCase() === target;
      });
    }

    // Apply search filter on top of category filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      temp = temp.filter((menu) =>
        menu.name.toLowerCase().includes(query)
      );
    }

    setFilteredMenus(temp);
    setCurrentPage(1);
  }, [menus, searchQuery, selectedCategory]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const totalMenusCount = Array.isArray(menus) ? menus.length : 0;

  const totalItems = filteredMenus.length;
  const totalPages = Math.max(Math.ceil(totalItems / ITEMS_PER_PAGE), 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMenus = filteredMenus.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients
          </p>

          {selectedCategory && (
            <p className="mt-2 text-sm text-gray-500">
              Filtered by category:{" "}
              <span className="font-semibold text-yellow-600">
                {selectedCategory}
              </span>
            </p>
          )}

          {/* Search Box */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 shadow-md"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            {searchQuery ? (
              <>
                Found{" "}
                <span className="font-semibold text-yellow-600">
                  {filteredMenus.length}
                </span>
                {filteredMenus.length === 1 ? " result" : " results"} for{" "}
                <span className="font-semibold">
                  &quot;{searchQuery}&quot;
                </span>
                {selectedCategory && (
                  <>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-yellow-600">
                      {selectedCategory}
                    </span>
                  </>
                )}
              </>
            ) : selectedCategory ? (
              <>
                Showing{" "}
                <span className="font-semibold text-yellow-600">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "dish" : "dishes"} in{" "}
                <span className="font-semibold text-yellow-600">
                  {selectedCategory}
                </span>
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-yellow-600">
                  {totalMenusCount}
                </span>{" "}
                {totalMenusCount === 1 ? "dish" : "dishes"}
              </>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentMenus.map((menu) => (
                <MenuCard menu={menu} key={menu._id} />
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
                  onClick={() => handlePageChange(currentPage - 1 + 2)} // currentPage + 1
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
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {searchQuery || selectedCategory ? (
                <>
                  No results found
                  {searchQuery && (
                    <>
                      {" "}
                      for &quot;{searchQuery}&quot;
                    </>
                  )}
                  {selectedCategory && (
                    <>
                      {" "}
                      in{" "}
                      <span className="font-semibold text-yellow-600">
                        {selectedCategory}
                      </span>
                    </>
                  )}
                </>
              ) : (
                "No menu items available."
              )}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold transition-colors duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
