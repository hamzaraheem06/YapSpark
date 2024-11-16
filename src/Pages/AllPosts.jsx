import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database";
import { PostCard, Loading } from "../components/Index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);
  databaseService
    .getPosts([])
    .then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    })
    .finally(() => setLoading(false));

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex flex-wrap gap-2">
          {posts.map((post) => (
            <PostCard
              key={post.$id}
              title={post.title}
              featuredImage={post.$id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllPosts;
