import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// TODO #13
// Afegeix un altre `import` perquè també es carreguin els estils (ja proporcionats en un arxiu .css) per la barra de navegació.
import "./navbar.css";

// Treiem intencionadament StrictMode per evitar doble renderitzat, ja que API només permet una crida cada 5 segons.
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
