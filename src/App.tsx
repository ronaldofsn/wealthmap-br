import React from 'react';
import BrazilMap from './components/BrazilMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Concentração de Riqueza no Brasil</h1>
        <p>Visualização da distribuição de riqueza por estado</p>
      </header>
      <main>
        <BrazilMap />
      </main>
      <footer>
        <p>Dados baseados em estatísticas oficiais do IBGE</p>
      </footer>
    </div>
  );
}

export default App;
