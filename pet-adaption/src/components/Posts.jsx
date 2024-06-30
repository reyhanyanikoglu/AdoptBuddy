import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Loader from "../components/Loader";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 /* post yoksa post bulunamadı uyarısı */ ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              type,
              title,
              description,
              city,
              breed,
              gender,
              age,
              phoneNumber,
              sterilize,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                description={description}
                title={title}
                type={type}
                city={city}
                breed={breed}
                gender={gender}
                age={age}
                phoneNumber={phoneNumber}
                sterilize={sterilize}
                createdAt={createdAt}
                userID={creator}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">Post not found</h2>
      )}
    </section>
  );
};

export default Posts;
