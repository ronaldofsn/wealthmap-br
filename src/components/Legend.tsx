import React from 'react';

interface LegendProps {
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ className = '' }) => {
  const legendItems = [
    { 
      color: '#800026', 
      label: 'Extremamente Alta', 
      value: '> 90%',
      description: 'Concentração crítica de riqueza'
    },
    { 
      color: '#BD0026', 
      label: 'Muito Alta', 
      value: '75-90%',
      description: 'Alta concentração de riqueza'
    },
    { 
      color: '#E31A1C', 
      label: 'Alta', 
      value: '50-75%',
      description: 'Concentração significativa'
    },
    { 
      color: '#FC4E2A', 
      label: 'Média-Alta', 
      value: '25-50%',
      description: 'Concentração moderada'
    },
    { 
      color: '#FD8D3C', 
      label: 'Média', 
      value: '10-25%',
      description: 'Concentração equilibrada'
    },
    { 
      color: '#FFEDA0', 
      label: 'Baixa', 
      value: '< 10%',
      description: 'Baixa concentração'
    }
  ];

  return (
    <div className={`legend ${className}`}>
      <h4>Concentração de Riqueza por Estado</h4>
      <p className="legend-description">Percentual da riqueza concentrada nos 10% mais ricos</p>
      <div className="legend-items">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item">
            <div className="color-box" style={{ backgroundColor: item.color }}></div>
            <div className="legend-text">
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
              <span className="legend-description-item">{item.description}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="legend-footer">
        <p>Dados baseados na distribuição de renda por estado</p>
      </div>
    </div>
  );
};

export default Legend; 