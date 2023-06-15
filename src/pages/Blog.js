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

  const addArticle = async () => {
    const { data, error } = await supabase
  .from('posts')
  .insert([
    { 
      title: 'Mastering Learning Strategies with AI-Powered Tools: A Step-by-Step Guide', 
      content: `
## Mastering Learning Strategies with AI-Powered Tools: A Step-by-Step Guide

The world of education is undergoing a major transformation with the advent of artificial intelligence. AI-powered tools are revolutionizing the way we learn and providing a personalized approach to education. This article will guide you through mastering learning strategies using AI-powered tools.

### Why Use AI-Powered Tools?

AI-powered tools are built on the foundation of machine learning and natural language processing. They are designed to understand, learn, and adapt to students' individual learning patterns. They can provide personalized learning resources, create study schedules, and even assist with homework.

### Step 1: Identify Your Learning Goals

Identify what you want to achieve from your learning process. Your goals should be SMART - Specific, Measurable, Achievable, Relevant, and Time-bound. 

### Step 2: Select the Right AI-Powered Tool

There are various AI tools available that cater to different learning needs. Some assist with test preparations, some help with homework, and some provide a comprehensive study guide. 

For instance, our platform offers a unique AI chatbot that can interact with you about textbooks, helping you understand complex concepts with ease.

### Step 3: Personalize Your Learning

AI-powered tools excel at personalization. They adapt to your learning style and pace, providing personalized study schedules and resources. Leverage these features to enhance your learning experience.

### Step 4: Practice Active Learning

Active learning involves engaging with the learning material. Ask questions, start discussions, and seek clarifications. Use AI tools to assist with this. Our chatbot, for example, is a great tool for active learning.

### Step 5: Regular Review and Assessment

To ensure effective learning, regular review and self-assessment are crucial. Many AI-powered tools have built-in assessment features. Make use of these features to track your progress.

### Step 6: Stay Healthy

A healthy body houses a healthy mind. Regular exercise, a balanced diet, and sufficient sleep can significantly improve your cognitive functions and learning capacity.

In conclusion, AI-powered tools are revolutionizing the educational landscape, making learning more efficient, personalized, and engaging. By leveraging these tools, you can master learning strategies and achieve your academic goals.
      

      `, 

    },
  ])


  
          

    console.log(data);
    console.log(error);
  };

  return (
    <div className="flex flex-col w-full space-y-6 bg-[#F0FFE0]">
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
