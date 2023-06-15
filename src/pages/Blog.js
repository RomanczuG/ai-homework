import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Button } from "../utils/ToolUtils";

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

  const addPost = async () => {
    const { error } = await supabase.from("posts").insert([
      {
        title: "The Ultimate Guide to Studying Smarter, Not Harder",
        content: `
## Why Study Smarter, Not Harder?
  
Studying smarter is all about maximizing your efficiency, so you can learn more in less time. It's about understanding how your brain works and leveraging that knowledge to your advantage. Studying smart means focusing on quality rather than quantity, and working with your natural rhythms instead of against them.

## Strategies to Study Smarter

1. **Set SMART Goals:** SMART is an acronym for Specific, Measurable, Achievable, Relevant, and Time-bound. Instead of setting vague goals like "study more," set SMART goals like "spend two hours each day reviewing calculus problems."
2. **Use the Pomodoro Technique:** This method involves studying for 25 minutes, then taking a five-minute break. This strategy helps maintain focus and prevents burnout.
3. **Practice Active Learning:** Engage with the material. Ask questions, discuss topics with others, and try to apply what you're learning to real-world scenarios.
4. **Use Spaced Repetition:** Instead of cramming all your studying into one long session, break it up into smaller sessions over a longer period. This takes advantage of the psychological spacing effect and can help improve memory recall.
5. **Take Care of Your Health:** Eating well, exercising regularly, and getting enough sleep can dramatically improve your cognitive functions and help you study more effectively.

## Embrace AI-Powered Tools

In this modern age, we can harness the power of artificial intelligence to aid in our academic pursuits. Our platform, for instance, offers an AI chatbot that can help you interact with and understand your textbooks in a more meaningful way.

## Conclusion

Studying smarter, not harder, is the key to academic success. By using these strategies and incorporating AI-powered tools, you can transform your studying habits and achieve your academic goals. The future of education is here, and it's about studying smarter.
      `,
      },
    ]);

    console.log(error);
  };

  return (
    <div className="flex flex-col w-full space-y-6">
      <Button onClick={addPost}>add post</Button>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<div>Loading...</div>}>
  {blogPosts.map((post, index) => (
    <BlogPost post={post} index={index} /> // index is passed as a prop here
  ))}
</Suspense>
      </div>
    </div>
  );
};

export default Blog;
