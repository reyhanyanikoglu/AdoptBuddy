import React, { useContext, useEffect, useState } from "react";
import PostUser from "../components/PostUser";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams(); //gönderinin kimliği
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostUser userID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id == post?.creator && (
              <div className="post-detail__buttons">
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn sm primary"
                >
                  Edit
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt=""
            />
          </div>
          <p>
            <span className="label">Gender: </span>
            <strong>{post.gender}</strong>
          </p>
          <p>
            <span className="label">City: </span>
            <strong>{post.city}</strong>
          </p>
          {post.age && (
            <p>
              <span className="label">Age: </span>
              <strong>{post.age}</strong>
            </p>
          )}
          {post.breed && (
            <p>
              <span className="label">Breed: </span>
              <strong>{post.breed}</strong>
            </p>
          )}
          {post.breed && (
            <p>
              <span className="label">Animal's Sterilize State: </span>
              <strong>{post.sterilize}</strong>
            </p>
          )}
          <p>
            <span className="label">Phone Number: </span>
            <strong>{post.phoneNumber}</strong>
          </p>
          <p>{post.description}</p>
          {/*<p dangerouslySetInnerHTML={{ __html: post.description }}></p>*/}
        </div>
      )}
    </section>
  );
};

export default PostDetails;
