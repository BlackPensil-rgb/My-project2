import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ALL_GIFTS } from './GiftsData';

// --- АНИМАЦИИ ---
const shake = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  20% { transform: translate(-3px, 0px) rotate(-1deg); }
  50% { transform: translate(-1px, 2px) rotate(1deg); }
  100% { transform: translate(1px, -2px) rotate(0deg); }
`;

// --- СТИЛИ ---
const AppContainer = styled.div`background: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; padding: 20px 20px 120px 20px;`;
const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;`;
const FatBalance = styled.div`background: #0a0a0a; padding: 10px 20px; border-radius: 25px; border: 1px solid #ffffff22; color: #fff; font-weight: 900; display: flex; align-items: center; gap: 8px;`;
const GameCard = styled.div<{ $color: string; $isOpening?: boolean }>`
  background: #080808; border-radius: 20px; margin-bottom: 15px; padding: 20px; display: flex; justify-content: space-between; align-items: center; 
  border: 1px solid #151515; cursor: pointer; animation: ${props => props.$isOpening ? shake : 'none'} 0.5s infinite;
`;
const Badge = styled.span`background: linear-gradient(90deg, #ffd700, #ff8c00); padding: 2px 8px; border-radius: 5px; font-size: 10px; color: #000; font-weight: 900;`;

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

export default function App() {
  const [tab, setTab] = useState('games');
  const [fat, setFat] = useState(Number(localStorage.getItem('fat')) || 1500);
  const [inventory, setInventory] = useState<any[]>(JSON.parse(localStorage.getItem('inv') || '[]'));
  const [isOwner, setIsOwner] = useState(localStorage.getItem('isOwner') === 'true');
  const [openingId, setOpeningId] = useState<number | null>(null);
  const [promo, setPromo] = useState('');

  // Сохранение данных
  useEffect(() => {
    localStorage.setItem('fat', fat.toString());
    localStorage.setItem('inv', JSON.stringify(inventory));
  }, [fat, inventory]);

  const claimDaily = () => {
    const last = Number(localStorage.getItem('lastB')) || 0;
    if (Date.now() - last < 86400000) return alert("❌ Жир еще не накопился!");
    setFat(f => f + 20); localStorage.setItem('lastB', Date.now().toString());
    alert("✅ +20 ЖИРА получено!");
  };

  const handleOpen = (c: any) => {
    if (fat < c.price) return alert("Мало ЖИРА!");
    setOpeningId(c.id);
    setTimeout(() => {
      const gift = ALL_GIFTS[Math.floor(Math.random() * (c.id === 5 ? 101 : 40))];
      setFat(f => f - c.price); setInventory(i => [gift, ...i]);
      setOpeningId(null);
      alert(`🎉 ВЫПАЛ: ${gift.emoji} ${gift.name}`);
    }, 1500);
  };

  const activatePromo = () => {
    if (promo === 'OwnerJir') { 
      setIsOwner(true); localStorage.setItem('isOwner', 'true'); 
      setFat(f => f + 100000000); alert("👑 СТАТУС OWNER АКТИВИРОВАН!");
    } else if (promo === 'CHINAZES') {
      setFat(f => f + 5000); alert("✅ +5000 ЖИРА!");
    }
    setPromo('');
  };

  return (
    <AppContainer>
      <Header><div>GIFT FUN</div><FatBalance>🍶 {fat.toLocaleString()} ЖИР</FatBalance></Header>

      {tab === 'games' && (
        <div>
          <div onClick={claimDaily} style={{background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)', padding: '15px', borderRadius: '15px', textAlign: 'center', fontWeight: '900', marginBottom: '20px'}}>🎁 ЕЖЕДНЕВНЫЙ БОНУС</div>
          {CASES.map(c => (
            <GameCard key={c.id} $color={c.color} $isOpening={openingId === c.id} onClick={() => handleOpen(c)}>
              <div><div style={{fontSize: '18px', fontWeight: '900'}}>{c.name}</div><div style={{fontSize: '12px', color: '#444'}}>{c.price} ЖИР</div></div>
              <div style={{fontSize: '40px'}}>{c.icon}</div>
            </GameCard>
          ))}
        </div>
      )}

      {tab === 'profile' && (
        <div>
          <div style={{background: '#0a0a0a', padding: '20px', borderRadius: '20px', textAlign: 'center', marginBottom: '15px'}}>
            <div style={{fontSize: '18px', fontWeight: '900'}}>ИГРОК {isOwner && <Badge>OWNER 👑</Badge>}</div>
          </div>
          <div style={{background: '#0a0a0a', padding: '15px', borderRadius: '20px', marginBottom: '15px'}}>
            <input placeholder="Промокод..." value={promo} onChange={e => setPromo(e.target.value)} style={{width: '100%', padding: '10px', background: '#000', border: '1px solid #222', color: '#fff', borderRadius: '8px', marginBottom: '10px', boxSizing: 'border-box'}} />
            <button onClick={activatePromo} style={{width: '100%', padding: '10px', background: '#00d2ff', border: 'none', borderRadius: '8px', fontWeight: 'bold'}}>АКТИВИРОВАТЬ</button>
          </div>
          <div style={{background: '#080808', padding: '15px', borderRadius: '20px', border: '1px dashed #222'}}>
            <h4 style={{margin: '0 0 10px 0'}}>📦 ИНВЕНТАРЬ ({inventory.length})</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px'}}>
              {inventory.map((item, i) => (
                <div key={i} style={{background: '#000', padding: '10px', borderRadius: '10px', textAlign: 'center', border: '1px solid #111'}}>
                  <div style={{fontSize: '24px'}}>{item.emoji}</div>
                  <div style={{fontSize: '8px', color: '#555'}}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '90%', height: '70px', background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', border: '1px solid #1a1a1a'}}>
        <div onClick={() => setTab('games')} style={{color: tab === 'games' ? '#00d2ff' : '#444', textAlign: 'center', fontSize: '10px', fontWeight: 'bold'}}>📦 КЕЙСЫ</div>
        <div onClick={() => setTab('profile')} style={{color: tab === 'profile' ? '#00d2ff' : '#444', textAlign: 'center', fontSize: '10px', fontWeight: 'bold'}}>👤 ПРОФИЛЬ</div>
      </div>
    </AppContainer>
  );
}
