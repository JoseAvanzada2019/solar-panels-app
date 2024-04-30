import React, { useState } from 'react';
import axios from 'axios';
import InputsComponent from './InputsComponent';

function PanelsPlacement() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [roof, setRoof] = useState({
    width: 200,
    height: 500
  }) 
  const [solarPanel, setSolarPanel] = useState({
    width: 5,
    height: 30
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/panels-placement/', {
        roof: { width: roof.width, height: roof.height},
        solar_panel: { width: solarPanel.width, height: solarPanel.height },
        type: "rectangular"
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const renderRectangles = () => {
    if (!data) return null;

    const roofStyle = {
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1,
    };

    function randomColor(){
      return '#' + Math.floor(Math.random()*16777215).toString(16);
    } 

    return (
      <svg width={roof.width} height={roof.height} style={{ border: '1px solid black', padding: '10px', alignSelf: ''}}>
        {/* Render roof rectangle */}
        <rect x={0} y={0} width={roof.width} height={roof.height} style={roofStyle} />

        {/* Render solar panel rectangles */}
        {data.arrangement.map((solarPanel, index) => (
          <rect key={index} x={solarPanel.x} y={solarPanel.y} width={solarPanel.width} height={solarPanel.height} style={ {
            fill: 'none',
            stroke: randomColor(),
            strokeWidth: 0.2,
        }} />
        ))}
      </svg>
    );
  };

  return (
    <div className="app-container">
      <div className="inputs-container">
        <InputsComponent 
        roof={roof} 
        setRoof={setRoof} 
        solarPanel={solarPanel} 
        setSolarPanel={setSolarPanel} 
        fetchData={fetchData} 
        loading={loading} 
        setData = {setData}
        />
      </div>
      <div className="roof-container">
        {renderRectangles()}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Total Solar Panels: {data.total_solar_panels}</p>
        </div>
      )}
    </div>
  );
}

export default PanelsPlacement;