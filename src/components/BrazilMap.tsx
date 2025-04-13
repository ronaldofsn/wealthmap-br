import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { wealthData, StateWealth } from '../data/wealthData';
import Legend from './Legend';

interface BrazilMapProps {
  width?: string;
  height?: string;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ width = '100%', height = '600px' }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768);
  const [showLegend, setShowLegend] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMobile(width <= 768);
      setShowLegend(width > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetch('/brazil-states.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading GeoJSON:', error));
  }, []);

  const getColor = (wealth: number) => {
    return wealth > 90 ? '#800026' :
           wealth > 75 ? '#BD0026' :
           wealth > 50 ? '#E31A1C' :
           wealth > 25 ? '#FC4E2A' :
           wealth > 10 ? '#FD8D3C' :
                        '#FFEDA0';
  };

  const style = (feature: any) => {
    const state = feature.properties.sigla;
    const stateData = wealthData.find((d: StateWealth) => d.state === state);
    return {
      fillColor: getColor(stateData?.wealth || 0),
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const state = feature.properties.sigla;
    const stateData = wealthData.find((d: StateWealth) => d.state === state);

    if (stateData) {
      layer.bindPopup(`
        <strong>${feature.properties.name}</strong><br />
        Concentração de Riqueza: ${stateData.wealth}%<br />
        População: ${stateData.population.toLocaleString()} habitantes<br />
        PIB: R$ ${stateData.gdp.toLocaleString()}
      `);
    }
  };

  const mapHeight = isMobile ? '400px' : height;

  return (
    <div style={{ width, height: mapHeight, position: 'relative', minHeight: '400px' }}>
      <MapContainer
        center={[-15.7801, -47.9292]}
        zoom={isMobile ? 3 : 4}
        style={{ height: '100%', width: '100%', minHeight: '400px' }}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
      {isMobile && (
        <button 
          className="legend-toggle"
          onClick={() => setShowLegend(!showLegend)}
        >
          {showLegend ? 'Ocultar Legenda' : 'Mostrar Legenda'}
        </button>
      )}
      {showLegend && (
        <div className="legend-container" style={{ position: 'absolute', zIndex: 1000 }}>
          <Legend />
        </div>
      )}
    </div>
  );
};

export default BrazilMap; 