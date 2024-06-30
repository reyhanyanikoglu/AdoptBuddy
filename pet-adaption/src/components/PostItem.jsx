import React from "react";
import { Link } from "react-router-dom";
import PostUser from "../components/PostUser";

const PostItem = ({
  postID,
  type,
  title,
  description,
  userID,
  thumbnail,
  createdAt,
  city,
  age,
  gender,
  sterilize,
  phoneNumber,
  breed,
}) => {
  const shortDescription =
    description.length > 140 ? description.substr(0, 145) + "..." : description;
  const post_title = title.length > 35 ? title.substr(0, 35) + "..." : title;

  return (
    <article className="post">
      <div className="post__thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          {" "}
          {/* ilan başlığına tıkladığında bu da onu detail sayfasına atacak */}
          <h3>{post_title}</h3>
        </Link>
        <p>
          <span className="label">Gender: </span><strong>{gender}</strong>
        </p>
        <p>
          <span className="label">City: </span><strong>{city}</strong>
        </p>
        {age && (
          <p>
            <span className="label">Age: </span><strong>{age}</strong>
          </p>
        )}
        {breed && (
          <p>
            <span className="label">Breed: </span><strong>{breed}</strong>
          </p>
        )}
        {sterilize && (
          <p>
            <span className="label">Animal's Sterilize State: </span><strong>{sterilize}</strong>
          </p>
        )}
        <p>
          <span className="label">Phone Number: </span><strong>{phoneNumber}</strong>
        </p>
        <p>{shortDescription}</p>
        <div className="post__footer">
          <PostUser userID={userID} createdAt={createdAt} />
          <Link to={`/posts/types/${type}`} className="btn type">
            {type}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;	