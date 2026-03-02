import React, { useState } from 'react';

export default function App() {
  const [fat, setFat] = useState(1500);
  
  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>GIFT FUN TEST</h1>
      <div style={{ background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #00d2ff' }}>
        <p>Если ты это видишь, значит проект ЖИВОЙ!</p>
        <h2>🍶 {fat} ЖИР</h2>
        <button onClick={() => setFat(f => f + 100)} style={{ padding: '10px 20px', background: '#00d2ff', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
          ДОБАВИТЬ ЖИР
        </button>
      </div>
    </div>
  );
}
