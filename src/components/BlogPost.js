import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch the blog post by its ID and set it to state...
    }, [id]);

    if (!post) return 'Loading...';

    return (
        <div className="p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-[#FF6E00] to-[#FFC700]">
                {post.title}
            </h2>
            <p>{post.content}</p>
        </div>
    );
}

export default BlogPost;
