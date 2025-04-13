import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { wealthData, StateWealth } from '../data/wealthData';
import Legend from './Legend';
import DataPanel from './DataPanel';

interface BrazilMapProps {
  width?: string;
  height?: string;
}

const BrazilMap: React.FC<BrazilMapProps> = ({ width = '100%', height = '600px' }) => {
  const [geoData, setGeoData] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(windowWidth <= 768);
  const [showLegend, setShowLegend] = useState(!isMobile);
  const [selectedState, setSelectedState] = useState<string | null>(null);

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
    return wealth > 80 ? '#800026' :
           wealth > 60 ? '#BD0026' :
           wealth > 40 ? '#E31A1C' :
           wealth > 20 ? '#FC4E2A' :
           wealth > 10 ? '#FD8D3C' :
                        '#FFEDA0';
  };

  const getWealthLevel = (state: string) => {
    const stateData = wealthData.find((d: StateWealth) => d.state === state);
    return stateData?.wealth || 0;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const style = (feature: any) => {
    const wealthLevel = getWealthLevel(feature.properties.sigla);
    return {
      fillColor: getColor(wealthLevel),
      weight: 1,
      opacity: 0.8,
      color: 'white',
      fillOpacity: 0.85,
      smoothFactor: 3,
      className: 'state-feature'
    };
  };

  const highlightFeature = (e: any) => {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      opacity: 1,
      color: 'rgba(255, 255, 255, 0.9)',
      fillOpacity: 0.95,
      className: 'state-feature highlighted'
    });
    layer.bringToFront();
  };

  const resetHighlight = (e: any) => {
    const layer = e.target;
    layer.setStyle(style(layer.feature));
  };

  const onEachFeature = (feature: any, layer: any) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: (e: any) => {
        const { sigla } = feature.properties;
        const stateData = wealthData.find(d => d.state === sigla);
        setSelectedState(sigla);
        
        if (stateData) {
          layer.bindPopup(
            `<div class="popup-content">
              <h3>${feature.properties.name}</h3>
              <div class="popup-data">
                <p><strong>Concentração de Riqueza:</strong> ${stateData.wealth.toFixed(1)}%</p>
                <p><strong>População:</strong> ${formatNumber(stateData.population)} habitantes</p>
                <p><strong>PIB:</strong> ${formatCurrency(stateData.gdp)}</p>
              </div>
            </div>`
          ).openPopup();
        }
      }
    });
  };

  const mapHeight = isMobile ? '400px' : height;

  return (
    <div className="map-container" style={{ width, height: mapHeight }}>
      <MapContainer
        center={[-15.7801, -47.9292]}
        zoom={isMobile ? 3 : 4}
        style={{ height: '100%', width: '100%' }}
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
      {showLegend && <Legend />}
      <DataPanel 
        selectedState={selectedState}
        onViewChange={() => {}}
      />
    </div>
  );
};

export default BrazilMap; 