import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Info from "./components/Info";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState([""]);
  const [password, setPassword] = useState([""]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
      console.log(exception);
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

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = {
        title,
        author,
        url,
      };
      await blogService.addBlog(blog);
      setBlogs(blogs.concat(blog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification(`${blog.title} added`);
      setNotificationType("success");
      dismissNotifications();
    } catch (exception) {
      setNotification(exception.response.data.error);
      setNotificationType("error");
      dismissNotifications();
    }
    console.log("new blog added");
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
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
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
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <br />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
