import React from "react";
import PropTypes from "prop-types";
import "./index.css";

function Postlist(props) {
  const { posts, onClick } = props;

  function handleonClick(post) {
    if (!onClick) return;
    onClick(post);
  }

  return (
    <ul className="post-list" style={{ cursor: "pointer" }}>
      {posts.postlistiteams.map((post) => (
        <li
          key={post.id}
          className={posts.active === post.id ? "active" : ""}
          onClick={() => handleonClick(post)}
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
}

Postlist.propTypes = {
  posts: PropTypes.object,
  onClick: PropTypes.func,
};

Postlist.defaultProps = {
  posts: {},
  onClick: null,
};

export default Postlist;
