import React, { useState, useEffect } from 'react';
import { wealthData } from '../data/wealthData';

interface DataPanelProps {
  selectedState: string | null;
  onViewChange: (view: string) => void;
}

const DataPanel: React.FC<DataPanelProps> = ({ selectedState, onViewChange }) => {
  const [sortBy, setSortBy] = useState('wealth');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isVisible, setIsVisible] = useState(!isMobile);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsVisible(width > 768);
      setIsCollapsed(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePanelClick = () => {
    if (isMobile) {
      if (!isVisible) {
        setIsVisible(true);
      } else {
        setIsCollapsed(!isCollapsed);
      }
    }
  };

  const sortedData = [...wealthData].sort((a, b) => {
    switch (sortBy) {
      case 'wealth':
        return b.wealth - a.wealth;
      case 'population':
        return b.population - a.population;
      case 'gdp':
        return b.gdp - a.gdp;
      default:
        return 0;
    }
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  return (
    <div 
      className={`data-panel ${isVisible ? 'visible' : ''} ${isCollapsed ? 'collapsed' : ''}`}
      onClick={handlePanelClick}
    >
      <div className="data-panel-header">
        <h2>Dados por Estado</h2>
        {isMobile && isVisible && (
          <span className="data-panel-toggle-icon">
            {isCollapsed ? '▼' : '▲'}
          </span>
        )}
      </div>
      {(!isMobile || !isCollapsed) && (
        <>
          <div className="sort-controls">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              title="Ordenar dados por"
              onClick={(e) => e.stopPropagation()}
            >
              <option value="wealth">Ordenar por Riqueza</option>
              <option value="population">Ordenar por População</option>
              <option value="gdp">Ordenar por PIB</option>
            </select>
          </div>
          <div className="data-panel-content">
            <table>
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Riqueza (%)</th>
                  <th>População</th>
                  <th>PIB</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((state) => (
                  <tr 
                    key={state.state}
                    className={selectedState === state.state ? 'selected' : ''}
                  >
                    <td>{state.state}</td>
                    <td>{state.wealth.toFixed(1)}%</td>
                    <td>{formatNumber(state.population)}</td>
                    <td>{formatCurrency(state.gdp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DataPanel; 