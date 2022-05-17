require("express-async-errors");
const blogsRouter = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post("/", async (req, res, next) => {
  const blog = new Blog(req.body);

  const result = await blog.save();
  res.status(201).json(result);
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  await Blog.findByIdAndRemove(id);
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const id = req.params.id;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  res.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
