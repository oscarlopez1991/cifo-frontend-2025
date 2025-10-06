import { useState } from 'react';
import './App.css';
import Card from './Card.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <h1 className="title">¡Hola, React con Vite! 👋</h1>
      <p className="subtitle">Contador: {count}</p>
      <button className="btn" onClick={() => setCount(count + 1)}>
        Incrementar
      </button>
      <Card title="Primera Card" content="Esto es un componente simple." />
    </div>
  );
}

export default App;
