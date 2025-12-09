// NewsLetter.jsx
import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return;
    }

    // Placeholder for future backend integration:
    // e.g., axios.post("/api/newsletter/subscribe", { email: trimmedEmail })
    console.log("Newsletter subscription email:", trimmedEmail);
    setEmail("");
  };

  return (
    <div className="w-full bg-slate-900 px-2 text-center text-white py-20 flex flex-col items-center justify-center">
      <p className="text-indigo-500 font-medium">Get updated</p>
      <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
        Subscribe to our newsletter &amp; get the latest news
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full"
      >
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center"
        >
          Subscribe now
        </button>
      </form>
    </div>
  );
}
