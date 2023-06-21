import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogPost = ({ post }) => {
  if (!post || !post.content) {
    return <div>Loading...</div>;
  }

  const limitedContent = post.content.slice(0, 100) + "...";

  return (
    <motion.div
      key={post.id}
      className="p-5 min-h-[25vh] bg-white rounded-lg shadow-lg"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
        {post.title}
      </h2>
      <div className="space-y-3 text-md">
        <ReactMarkdown>{limitedContent}</ReactMarkdown>
        <Link
          to={`/blog/${post.id}`}
          className="text-blue-500 hover:text-blue-400 transition"
        >
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogPost;
