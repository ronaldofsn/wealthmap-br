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
      description: 'Maior concentração de riqueza do país'
    },
    { 
      color: '#BD0026', 
      label: 'Muito Alta', 
      value: '75-90%',
      description: 'Alta desigualdade econômica'
    },
    { 
      color: '#E31A1C', 
      label: 'Alta', 
      value: '50-75%',
      description: 'Concentração acima da média'
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
      description: 'Distribuição mais equilibrada'
    },
    { 
      color: '#FFEDA0', 
      label: 'Baixa', 
      value: '< 10%',
      description: 'Melhor distribuição de renda'
    }
  ];

  return (
    <div className={`legend ${className}`}>
      <h4>Concentração de Riqueza por Estado</h4>
      <p className="legend-description">Percentual da riqueza total concentrada nos 10% mais ricos da população</p>
      <div className="legend-items">
        {legendItems.map((item, index) => (
          <div key={index} className="legend-item">
            <div 
              className="legend-color" 
              style={{ 
                backgroundColor: item.color,
                boxShadow: `0 2px 4px ${item.color}33`
              }}
            />
            <div className="legend-label">
              {item.label}
              <div className="legend-description">{item.description}</div>
            </div>
            <div className="legend-value">{item.value}</div>
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