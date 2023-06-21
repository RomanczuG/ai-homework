import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";

const BlogPostDetail = () => {
  const [post, setPost] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    console.log(id);
    let { data: post, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) console.log("Error: ", error);
    else setPost(post);
  };

  if (!post || !post.content) return <div>Loading...</div>;

  return (
    <div className="bg-[#F0FFE0] p-6">
      <Helmet>
        <title>{post.title}</title>
        <meta
          name="description"
          content={post.content.slice(0, 155)}
        />
        <meta
          name="keywords"
          content="study smarter, test taking strategies, homework help websites"
        />
        <link rel="canonical" href={`https://www.studysmarternow.com/blog/${id}`} />
      </Helmet>
      <motion.div
        className="max-w-3xl mx-auto  p-5 bg-white rounded-lg shadow-lg "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {post.title}
        </h2>
        <div className="space-y-3">
          <ReactMarkdown className="prose">{post.content}</ReactMarkdown>
          <Link
            to="/blog"
            className="text-blue-500 hover:text-blue-400 transition"
          >
            Back to Posts
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPostDetail;
