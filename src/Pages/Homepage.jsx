import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Loading, Button, PostCard } from "../components/Index";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Yap Spark</h1>
            <p className="py-6">
              Unleash your voice on YapSpark, where ideas ignite and stories
              come to life. Dive into a world of untold passions and bold
              expressions, connecting with curious minds eager to discover new
              perspectives.
            </p>
            <Button buttonType="btn-primary" children="Get Started" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <div className="hero bg-base-200 min-h-screen">
        <div className="flex flex-wrap gap-2">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

// import React, { useEffect, useState } from "react";
// import databaseService from "../appwrite/database";
// import { Container, PostCard } from "../components/Index";

// function Homepage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     databaseService.getPosts().then((posts) => {
//       if (posts) {
//         setPosts(posts.documents);
//       }
//     });
//   }, []);

//   if (posts.length === 0) {
//     return (
//       <div className="w-full py-8 mt-4 text-center">
//         <div className="flex flex-wrap">
//           <div className="p-2 w-full">
//             <h1 className="text-2xl font-bold hover:text-gray-500">
//               Login to read posts
//             </h1>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <div className="w-full py-8">
//       <Container>
//         <div className="flex flex-wrap">
//           {posts.map((post) => (
//             <div key={post.$id} className="p-2 w-1/4">
//               <PostCard {...post} />
//             </div>
//           ))}
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Homepage;
