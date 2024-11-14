import React from "react";

function Container({ children }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
          alt="Album"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{children}</h2>
        <p>{children}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">{children}</button>
        </div>
      </div>
    </div>
  );
}

export default Container;
