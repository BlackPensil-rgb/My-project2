import React, { useState, useEffect } from 'react';

// --- ДАННЫЕ КЕЙСОВ ---
const CASES_DATA = [
  { id: 1, name: 'БЫСТРЫЙ СТАРТ', price: 100, color: '#00d2ff', icon: '🍶' },
  { id: 2, name: 'ПРОДВИНУТЫЙ', price: 250, color: '#00ff88', icon: '🧪' },
  { id: 3, name: 'ЖИРНЫЙ КУШ', price: 400, color: '#ffff00', icon: '💰' },
  { id: 4, name: 'СИГМА КЕЙС', price: 550, color: '#888888', icon: '🗿' },
  { id: 5, name: 'МУСЛИМ КЕЙС', price: 700, color: '#00ff00', icon: '🕌' },
  { id: 6, name: 'ПИСАРЬ ЯЩИК', price: 800, color: '#ffaa00', icon: '📜' },
  { id: 7, name: 'ЯЩИК СТРАХА', price: 1000, color: '#ff4400', icon: '💀' },
  { id: 8, name: 'ЧИГУР БОКС', price: 1200, color: '#5500ff', icon: '💨' },
  { id: 9, name: 'В.В. ПУТИН БОКС', price: 1500, color: '#ffffff', icon: '🇷🇺' },
  { id: 10, name: 'Н2 КЕЙС', price: 1700, color: '#00ccff', icon: '💧' },
  { id: 11, name: 'БАНКА АВТОРА', price: 2500, color: '#ff00ff', icon: '🎨' },
  { id: 12, name: 'ЗОЛОТОЙ СЛИТОК', price: 4000, color: '#ffd700', icon: '🧱' },
  { id: 13, name: 'ОШИБКА ВЫЖИВШЕГО', price: 5500, color: '#ff0055', icon: '⚠️' },
  { id: 14, name: 'УЛЬТРА ЖИР', price: 7500, color: '#00ffcc', icon: '🌊' },
  { id: 15, name: 'СЕКРЕТНЫЙ ШИФР', price: 8500, color: '#aa00ff', icon: '📟' },
  { id: 16, name: 'DEPARTMENT ELITE', price: 10000, color: '#ff0000', icon: '👑' },
];

// --- ГЕНЕРАТОР ПОДАРКОВ ---
const tgEmojis = ["🧸", "🍷", "💍", "🌹", "💎", "🎁", "👑", "🦁", "🚗", "🏠", "🛥️", "🚀", "🏝️", "🍾", "🎸", "⌚", "🏆", "🎰", "💰", "🧿"];
const ALL_GIFTS = Array.from({ length: 101 }, (_, i) => ({
  id: i + 1,
  name: i === 0 ? "Мишка" : i === 100 ? "🔥 DEPARTMENT" : `Подарок #${i + 1}`,
  emoji: i === 0 ? "🧸" : i === 100 ? "🏛️" : tgEmojis[i % tgEmojis.length],
}));

export default function App() {
  const [tab, setTab] = useState('cases');
  const [fat, setFat] = useState(() => Number(localStorage.getItem('fat')) || 1500);
  const [inventory, setInventory] = useState<any[]>(() => JSON.parse(localStorage.getItem('inv') || '[]'));
  const [status, setStatus] = useState<'idle' | 'opening' | 'win'>('idle');
  const [winItem, setWinItem] = useState<any>(null);

  // Сохранение
  useEffect(() => {
    localStorage.setItem('fat', fat.toString());
    localStorage.setItem('inv', JSON.stringify(inventory));
  }, [fat, inventory]);

  const handleOpen = (c: any) => {
    if (fat < c.price) return alert("❌ Мало жира!");
    setStatus('opening');
    
    setTimeout(() => {
      const range = c.id === 5 ? 101 : 40;
      const gift = ALL_GIFTS[Math.floor(Math.random() * range)];
      setFat(f => f - c.price);
      setInventory(prev => [gift, ...prev]);
      setWinItem(gift);
      setStatus('win');
    }, 1200);
  };

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px 20px 100px 20px', userSelect: 'none' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ fontWeight: 900, fontSize: '22px' }}>GIFT FUN</div>
        <div style={{ background: '#111', padding: '10px 15px', borderRadius: '20px', color: '#00d2ff', fontWeight: 800, border: '1px solid #222' }}>
          🍶 {fat.toLocaleString()}
        </div>
      </div>

      {/* CASES TAB */}
      {tab === 'cases' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {CASES_DATA.map(c => (
            <div key={c.id} onClick={() => handleOpen(c)} style={{ background: '#0a0a0a', borderRadius: '25px', padding: '25px 10px', textAlign: 'center', border: `1px solid ${c.color}22` }}>
              <div style={{ fontSize: '50px', marginBottom: '10px' }}>{c.icon}</div>
              <div style={{ fontSize: '11px', fontWeight: 900, color: c.color, textTransform: 'uppercase' }}>{c.name}</div>
              <div style={{ fontSize: '12px', color: '#555', marginTop: '5px' }}>{c.price} ЖИР</div>
            </div>
          ))}
        </div>
      )}

      {/* PROFILE TAB */}
      {tab === 'profile' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ width: '80px', height: '80px', background: '#111', borderRadius: '50%', margin: '0 auto 15px', border: '2px solid #00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '35px' }}>👤</div>
            <div style={{ fontSize: '20px', fontWeight: 900 }}>ПРОФИЛЬ</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {inventory.map((item, i) => (
              <div key={i} style={{ background: '#0d0d0d', padding: '15px', borderRadius: '15px', textAlign: 'center', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '30px' }}>{item.emoji}</div>
                <div style={{ fontSize: '8px', color: '#666', marginTop: '5px' }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OVERLAY: OPENING */}
      {status === 'opening' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '80px' }}>🍶</div>
          <h2 style={{ letterSpacing: '3px' }}>ОТКРЫВАЕМ...</h2>
        </div>
      )}

      {/* OVERLAY: WIN */}
      {status === 'win' && winItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.98)', zIndex: 101, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '120px', marginBottom: '20px' }}>{winItem.emoji}</div>
          <h1 style={{ fontSize: '38px', fontWeight: 900, margin: '0' }}>ЧИНАЗЕС!</h1>
          <div style={{ fontSize: '18px', color: '#00d2ff', fontWeight: 800, marginTop: '10px' }}>{winItem.name}</div>
          <button onClick={() => setStatus('idle')} style={{ marginTop: '50px', padding: '15px 50px', borderRadius: '20px', background: '#fff', border: 'none', fontWeight: 900, fontSize: '16px' }}>ЗАБРАТЬ</button>
        </div>
      )}

      {/* BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', height: '70px', background: '#111', borderRadius: '30px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #222' }}>
        <div onClick={() => setTab('cases')} style={{ textAlign: 'center', color: tab === 'cases' ? '#00d2ff' : '#444' }}>
          <div style={{ fontSize: '22px' }}>📦</div>
          <div style={{ fontSize: '10px', fontWeight: 900 }}>КЕЙСЫ</div>
        </div>
        <div onClick={() => setTab('profile')} style={{ textAlign: 'center', color: tab === 'profile' ? '#00d2ff' : '#444' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <div style={{ fontSize: '10px', fontWeight: 900 }}>ПРОФИЛЬ</div>
        </div>
      </div>
    </div>
  );
}
