  import React, { useState } from "react";
  import { motion } from "framer-motion";

  const App = () => {
    const [review, setReview] = useState("");
    const [data, setData] = useState(null);

    async function submit() {
      const res = await fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ review }),
      });
      const json = await res.json();
      setData(json);
      setReview("");
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center border border-white/20"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold text-white mb-8 drop-shadow-lg">
            🛍️ Product Review Analyzer
          </h1>

          <input
            type="text"
            placeholder="Type your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-4 rounded-2xl border border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-400 text-black text-lg shadow-md"
          />

          <button
            onClick={submit}
            className="mt-6 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 text-white font-semibold py-4 rounded-2xl shadow-lg transition duration-300 text-lg"
          >
            🚀 Analyze Review
          </button>

          {data && (
            <motion.div
              className={`mt-8 p-6 rounded-2xl text-xl font-bold shadow-xl ${
                data.message.includes("Positive")
                  ? "bg-gradient-to-r from-green-400 to-emerald-600 text-white"
                  : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-2xl">{data.message}</h1>
              {data.score !== undefined && (
                <p className="mt-2 text-lg font-medium">
                  Confidence: {data.score.toFixed(2)}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  export default App;
