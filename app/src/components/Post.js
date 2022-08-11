// components/Post.js
import React from "react";
import { Link } from "react-router-dom";
export default function Post({ article }) {
  const { _id, title, description } = article;
  return (
    <article className="Article">
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={`/single-post/${_id}`}>Read more &rarr;</Link>
    </article>
  );
}