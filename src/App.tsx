import React from 'react';
import BrazilMap from './components/BrazilMap';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Concentração de Riqueza no Brasil</h1>
        <p>Visualização da distribuição de riqueza por estado</p>
        <div className="data-info">
          <p>Dados do IBGE (2021)</p>
        </div>
      </header>
      <main>
        <BrazilMap />
      </main>
      <footer>
        <p>Desenvolvido com React e Leaflet</p>
      </footer>
    </div>
  );
}

export default App;
