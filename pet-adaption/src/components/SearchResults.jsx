import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";

const SearchResults = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.toString();
        const response = await axios.get(`http://localhost:5000/api/posts/search?${query}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [location.search]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
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

export default SearchResults;
