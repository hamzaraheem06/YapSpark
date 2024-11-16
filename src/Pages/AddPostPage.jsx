import React from "react";
import { PostForm, Loading } from "../components/Index";

function AddPostPage() {
  const [loading, setLoading] = useState(true);

  setInterval(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-wrap justify-center items-center">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="py-8">
        <div className="hero bg-base-200 min-h-screen">
          <PostForm />
        </div>
      </div>
    );
  }
}
export default AddPostPage;
