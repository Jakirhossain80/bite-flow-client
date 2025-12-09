// AddMenu.jsx
import { useState, useContext } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AddMenu = () => {
  const { axios, navigate, loading, setLoading, categories } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;

    setFile(selectedFile);

    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedDescription = formData.description.trim();
    const priceValue = Number(formData.price);
    const categoryValue = formData.category;

    if (!trimmedName) {
      toast.error("Menu name is required");
      return;
    }

    if (!trimmedDescription) {
      toast.error("Menu description is required");
      return;
    }

    if (!priceValue || priceValue <= 0) {
      toast.error("Please enter a valid menu price");
      return;
    }

    if (!categoryValue) {
      toast.error("Please select a category");
      return;
    }

    if (!file) {
      toast.error("Please upload a menu image");
      return;
    }

    try {
      setLoading(true);

      // Use FormData to align with backend multer upload.single("image")
      const payload = new FormData();
      payload.append("name", trimmedName);
      payload.append("price", priceValue.toString());
      payload.append("description", trimmedDescription);
      payload.append("category", categoryValue);
      payload.append("image", file); // field name must be "image"

      const { data } = await axios.post("/api/menu/add", payload);

      if (data.success) {
        toast.success(data.message || "Menu added successfully");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
        });
        setFile(null);
        setPreview(null);
        navigate("/admin/menus");
      } else {
        toast.error(data.message || "Failed to add menu");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong while adding menu"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full flex flex-col gap-5"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter Menu name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter Menu Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Description *
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter Menu Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menu Image *
          </label>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {/* Custom upload area */}
          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 transition"
          >
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-600 text-sm">
              {file ? file.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
          />
        )}

        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
