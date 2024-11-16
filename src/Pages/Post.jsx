import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Button, Loading, InvalidError, AlertError } from "../components/Index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        databaseService.deleteFile(post.$id);
        navigate("/");
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    return post ? (
      <div className="hero bg-base-200 min-h-screen">
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={databaseService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button buttonType="btn-primary" children="Edit" />
              </Link>
              <Button buttonType="" children="Delete" onclick={deletePost} />
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </div>
    ) : (
      <div className="hero bg-base-200 min-h-screen">
        <AlertError error={error.message} />
      </div>
    );
  }
}
