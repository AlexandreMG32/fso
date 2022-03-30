import * as ReactDOMClient from "react-dom/client";
import App from "./App";

const root = ReactDOMClient.createRoot(document.querySelector("#root"));
root.render(<App />);

// Subsequent renders. Container is implicitly accessed.
root.render(<App />);
