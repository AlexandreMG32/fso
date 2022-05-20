import { useState } from "react";

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [visible, setVisibility] = useState(false);

  const userVisible = {
    display: user.username === blog.user.username ? "" : "none",
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  if (!visible) {
    return (
      <div className="blog" style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>hide</button>
      <div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={like}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={userVisible}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
