import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Info from "./components/Info";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification("Logged In Successfully");
      setNotificationType("success");
      dismissNotifications();
    } catch (exception) {
      setNotification(exception.response.data.error);
      setNotificationType("error");
      dismissNotifications();
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUser");
    setNotification("Logged Out");
    setNotificationType("success");
    dismissNotifications();
  };

  const addBlog = async (blog) => {
    try {
      const blogAdded = await blogService.addBlog(blog);
      setBlogs(blogs.concat(blogAdded));
      setNotification(`${blog.title} added`);
      setNotificationType("success");
      blogFormRef.current.toggleVisibility();
      dismissNotifications();
    } catch (exception) {
      setNotification(exception.response.data.error);
      setNotificationType("error");
      dismissNotifications();
    }
  };

  const likeBlog = async (blog) => {
    try {
      const blogEditted = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };
      await blogService.likeBlog(blogEditted, blog.id);
      setBlogs(
        blogs.map((blog) =>
          blog.id === blogEditted.id
            ? blog
            : { ...blog, likes: blogEditted.likes }
        )
      );
    } catch (e) {
      setNotification("Something went wrong");
      setNotificationType("error");
      dismissNotifications();
    }
  };

  const deleteBlog = async (blogToDelete) => {
    try {
      if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
        await blogService.deleteBlog(blogToDelete.id);
        setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
        setNotification(`${blogToDelete.title} eliminado`);
        setNotificationType("success");
        dismissNotifications();
      }
    } catch (err) {
      setNotification("Something went wrong");
      setNotificationType("error");
      dismissNotifications();
    }
  };

  const dismissNotifications = () => {
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <Info message={notification} type={notificationType} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Info message={notification} type={notificationType} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <br />
      <Togglable buttonLabel="new Blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes;
        })
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => likeBlog(blog)}
            deleteBlog={() => deleteBlog(blog)}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
