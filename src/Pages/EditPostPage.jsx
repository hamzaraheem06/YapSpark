import React, { useState, useEffect } from "react";
import databaseService from "../appwrite/database";
import { PostForm, Loading, InvalidError } from "../components/Index";
import { useNavigate, useParams } from "react-router-dom";

function EditPostPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams;
  const navigate = useNavigate();
  const [error, setError] = "";

  useEffect(() => {
    if (slug) {
      databaseService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => setLoading(false));
    }
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    return post ? (
      <div className="hero bg-base-200 min-h-screen">
        <PostForm post={post} />
      </div>
    ) : (
      <div className="hero bg-base-200 min-h-screen">
        <InvalidError error={error} />
      </div>
    );
  }
}

export default EditPostPage;
