// InputsComponent.js
import React from 'react';
import './InputsComponent.css';

function InputsComponent({ roof, setRoof, solarPanel, setSolarPanel, fetchData, loading, setData }) {
  const handleRoofWidthChange = (e) => {
    setRoof({ ...roof, width: parseInt(e.target.value) });
    setData(null)
  };

  const handleRoofHeightChange = (e) => {
    setRoof({ ...roof, height: parseInt(e.target.value) });
    setData(null)
  };

  const handleSolarPanelWidthChange = (e) => {
    setSolarPanel({ ...solarPanel, width: parseInt(e.target.value) });
    setData(null)
  };

  const handleSolarPanelHeightChange = (e) => {
    setSolarPanel({ ...solarPanel, height: parseInt(e.target.value) });
    setData(null)
  };

  const isAnyInputEmpty = () => {
    return !roof.width || !roof.height || !solarPanel.width || !solarPanel.height;
  };

  return (
    <div className="inputs-container">
      <label htmlFor="roofWidth">Roof Width:</label>
      <input type="number" id="roofWidth" value={roof.width} onChange={handleRoofWidthChange} />
      <label htmlFor="roofHeight">Roof Height:</label>
      <input type="number" id="roofHeight" value={roof.height} onChange={handleRoofHeightChange} />
      <label htmlFor="solarPanelWidth">Solar Panel Width:</label>
      <input type="number" id="solarPanelWidth" value={solarPanel.width} onChange={handleSolarPanelWidthChange} />
      <label htmlFor="solarPanelHeight">Solar Panel Height:</label>
      <input type="number" id="solarPanelHeight" value={solarPanel.height} onChange={handleSolarPanelHeightChange} />
      <button onClick={fetchData} disabled={loading || isAnyInputEmpty()}>Fetch Data</button>
    </div>
  );
}

export default InputsComponent;