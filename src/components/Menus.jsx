// Menus.jsx
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";

const Menus = () => {
  const { menus } = useContext(AppContext);

  const hasMenus = Array.isArray(menus) && menus.length > 0;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menus.map((menu) => (
              <MenuCard key={menu._id} menu={menu} />
            ))}
          </div>
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
