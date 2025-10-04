import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// TODO #1
// D'on venen els mètodes createRoot i render de les línies següents?
// D'on ve l'element amb identificador root?
// Què fa el mètode render?
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
