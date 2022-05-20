import React from "react";
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = async (event) => {
    event.preventDefault();
    if (
      await addBlog({
        title,
        author,
        url,
      })
    ) {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
          />
        </div>
        <div>
          Url
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Url"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
