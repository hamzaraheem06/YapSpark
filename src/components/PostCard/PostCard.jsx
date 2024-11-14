import React from "react";
import databaseService from "../../appwrite/database";
import { Link } from "react-router-dom";
import { Button } from "../index";

function PostCard({ $id, featuredImage, title }) {
  const onclickHandler = () => {};

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
          <h2 className="card-title">SpiderMan: No way Home{title}</h2>
          <p>A Blog about "{title}"</p>
          <div className="card-actions justify-end">
            <Button
              buttonType="btn-primary"
              children="Read more"
              onclick={onclickHandler}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
