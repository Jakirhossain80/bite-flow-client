// AdminLogin.jsx
import { useContext, useState } from "react";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const { navigate, loading, setLoading, axios, setAdmin } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      // axios here already has baseURL and withCredentials from AppContext
      const { data } = await axios.post(
        "/api/auth/admin/login",
        { email, password },
        {
          // Not strictly necessary if axios.defaults.withCredentials = true,
          // but harmless and explicit:
          withCredentials: true,
        }
      );

      if (data.success) {
        // Save admin info in React state + localStorage
        if (data.admin) {
          localStorage.setItem("admin", JSON.stringify(data.admin));
          setAdmin(data.admin);
        }
        toast.success(data.message || "Admin logged in successfully");
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="py-12 w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
      >
        <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
          Login
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
          Please login to continue
        </p>

        <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <MailIcon className="text-white" />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <LockIcon className="text-white" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full h-11 rounded-full text-white bg-orange-500 hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
