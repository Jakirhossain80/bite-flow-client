// AddCategory.jsx
import { useContext, useState } from "react";
import { Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading } = useContext(AppContext);
  const [formData, setFormData] = useState({ name: "", image: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, image: selectedFile }));
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setFormData((prev) => ({ ...prev, image: null }));
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!file) {
      toast.error("Please select a category image");
      return;
    }

    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      // Field name must match backend multer config: upload.single("image")
      payload.append("image", file);

      const { data } = await axios.post("/api/category/add", payload);

      if (data.success) {
        toast.success(data.message || "Category added successfully");
        setFormData({ name: "", image: null });
        setFile(null);
        setPreview(null);
        navigate("/admin/categories");
      } else {
        toast.error(data.message || "Failed to add category");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong while adding category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full flex flex-col gap-5"
      >
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-1/2 rounded-lg border border-gray-200"
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category Image *
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

        <button
          type="submit"
          className="bg-orange-500 text-white px-8 py-3 rounded-md hover:bg-orange-600 transition-colors cursor-pointer"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
