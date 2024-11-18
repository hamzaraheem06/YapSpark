import React from "react";
import databaseService from "../../appwrite/database";
import { Link } from "react-router-dom";
// import { Button } from "../Index";

function PostCard({ $id, featuredImage, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="card bg-base-100 image-full w-96 shadow-xl">
        <figure>
          <img
            src={databaseService.getFilePreview(featuredImage)}
            alt={title}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>A Blog about "{title}"</p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
