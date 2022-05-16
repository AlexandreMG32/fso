const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map((b) => b.likes));
  return blogs.find((blog) => blog.likes === max);
};

const mostBlogs = (blogs) => {
  const authorByName = _.groupBy(blogs, "author");
  const x = _.flatMap(authorByName, (author) => {
    return {
      author: author.map((author) => author.author)[0],
      blogs: _.values(author).length,
    };
  });

  return x.find(
    (author) => author.blogs === Math.max(...x.map((a) => a.blogs))
  );
};

const mostLikes = (blogs) => {
  const authors = _.flatMap(blogs, (blog) => {
    return { author: blog.author, likes: blog.likes };
  });
  const x = _.groupBy(authors, "author");
  const y = _.flatMap(x, (author) => {
    return {
      author: author.map((author) => author.author)[0],
      likes: author.reduce((acc, obj) => acc + obj.likes, 0),
    };
  });
  return y.find(
    (author) => author.likes === Math.max(...y.map((a) => a.likes))
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
};
