import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// TODO #1
// D'on venen els mètodes createRoot i render de les línies següents?
// --> The methods `createRoot` and `render` come from the `react-dom/client` package. `createRoot` creates a root for your React app, and `render` is used to display your React components inside the root element.

// D'on ve l'element amb identificador root?
// --> The element with the identifier `root` comes from the [index.html](../../index.html) file. It is a `<div id="root"></div>` in the HTML, which is the mounting point for your React app.

// Què fa el mètode render?
// --> The `render` method takes your React component tree (here, `<App />` inside `<React.StrictMode>`) and displays it inside the `root` element in the DOM. It updates the UI whenever your React state or props change.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
