import React, { useState } from 'react';
import axios from 'axios';

function CuttingStock() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bigRectangle, setBigRectangle] = useState({
    width: 800,
    height: 100
  }) 

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/panels-placement/', {
        big_rectangle: { width: bigRectangle.width, height: bigRectangle.height},
        small_rectangle: { width: 300, height: 25 }
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

    const bigRectangleStyle = {
      fill: 'none',
      stroke: 'black',
      strokeWidth: 1,
    };

    const smallRectangleStyle = {
      fill: 'none',
      stroke: 'red',
      strokeWidth: 1,
    };

    return (
      <svg width={bigRectangle.width} height={bigRectangle.height}>
        {/* Render big rectangle */}
        <rect x={0} y={0} width={bigRectangle.width} height={bigRectangle.height} style={bigRectangleStyle} />

        {/* Render small rectangles */}
        {data.arrangement.map((rectangle, index) => (
          <rect key={index} x={rectangle.x} y={rectangle.y} width={rectangle.width} height={rectangle.height} style={smallRectangleStyle} />
        ))}
      </svg>
    );
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Total Small Rectangles: {data.total_small_rectangles}</p>
          <div>
            <p>Arrangement:</p>
            {renderRectangles()}
          </div>
        </div>
      )}
    </div>
  );
}

export default CuttingStock;
