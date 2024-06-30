import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
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

export default UserPosts;
