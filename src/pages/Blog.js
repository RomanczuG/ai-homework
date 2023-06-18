import React, { useState, useEffect, Suspense } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "../utils/ToolUtils";
// import { Button } from "../utils/ToolUtils";

const BlogPost = React.lazy(() => import("../components/BlogPost"));

const Blog = () => {
  // Here is where you would fetch your blog posts from your client and save them to state
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*");

    if (error) console.log("Error: ", error);
    else setBlogPosts(posts);
  };

  return (
    <div className="flex flex-col items-center p-6 w-full space-y-6 bg-[#F0FFE0]">
        <h1 className="text-5xl font-bold mt-10 mb-10 text-gray-900 bg-clip-text  ">
        Here is our 
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
          {" "}
          blog about learning!
        </span>

      </h1>
      {/* <Button onClick={addArticle}>New</Button> */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<div>Loading...</div>}>
          {blogPosts.map((post, index) => (
            <BlogPost post={post} index={index} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default Blog;
