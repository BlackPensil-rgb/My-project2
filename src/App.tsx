import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { ALL_GIFTS } from './GiftsData';

const GlobalStyle = createGlobalStyle`
  body { margin: 0; background: #000; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
`;

const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const popIn = keyframes`0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; }`;

const AppContainer = styled.div`min-height: 100vh; padding: 20px 20px 140px 20px; max-width: 500px; margin: 0 auto;`;

const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;`;
const Balance = styled.div`background: #111; border: 1px solid #222; padding: 10px 18px; border-radius: 25px; color: #00d2ff; font-weight: 800;`;

const CaseGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 15px;`;

const CaseCard = styled.div<{ $color: string }>`
  background: #0a0a0a; border-radius: 30px; padding: 25px 10px; text-align: center;
  border: 1px solid ${p => p.$color}33; position: relative;
  &:active { transform: scale(0.95); }
`;

const WinOverlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 9999; 
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  animation: ${fadeIn} 0.3s;
`;

const BottomNav = styled.div`
  position: fixed; bottom: 25px; left: 20px; right: 20px; height: 70px;
  background: rgba(15,15,15,0.9); backdrop-filter: blur(10px); border-radius: 30px;
  display: flex; justify-content: space-around; align-items: center; border: 1px solid #222;
`;

const NavItem = styled.div<{ $active: boolean }>`
  color: ${p => p.$active ? '#00d2ff' : '#444'}; text-align: center; font-size: 10px; font-weight: 900;
`;

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
  const [tab, setTab] = useState('cases');
  const [fat, setFat] = useState(() => Number(localStorage.getItem('fat')) || 1500);
  const [inventory, setInventory] = useState<any[]>(() => JSON.parse(localStorage.getItem('inv') || '[]'));
  const [opening, setOpening] = useState(false);
  const [winItem, setWinItem] = useState<any>(null);

  useEffect(() => {
    localStorage.setItem('fat', fat.toString());
    localStorage.setItem('inv', JSON.stringify(inventory));
  }, [fat, inventory]);

  const handleOpen = (c: any) => {
    if (fat < c.price) return alert("❌ Мало ЖИРА!");
    
    setOpening(true);
    
    // Имитация открытия
    setTimeout(() => {
      try {
        const range = c.id === 5 ? 101 : 40;
        const index = Math.floor(Math.random() * Math.min(range, ALL_GIFTS.length));
        const gift = ALL_GIFTS[index] || ALL_GIFTS[0]; // Если вдруг индекс битый, даем первый подарок

        setFat(prev => prev - c.price);
        setInventory(prev => [gift, ...prev]);
        setWinItem(gift);
      } catch (e) {
        console.error(e);
        alert("Ошибка при открытии!");
      } finally {
        setOpening(false);
      }
    }, 1200);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <div style={{fontWeight: 900}}>GIFT FUN</div>
          <Balance>🍶 {fat.toLocaleString()}</Balance>
        </Header>

        {tab === 'cases' && (
          <CaseGrid>
            {CASES_DATA.map(c => (
              <CaseCard key={c.id} $color={c.color} onClick={() => handleOpen(c)}>
                <div style={{fontSize: '50px', marginBottom: '10px'}}>{c.icon}</div>
                <div style={{fontSize: '11px', fontWeight: 900, color: c.color}}>{c.name}</div>
                <div style={{fontSize: '12px', color: '#555'}}>{c.price} ЖИР</div>
              </CaseCard>
            ))}
          </CaseGrid>
        )}

        {tab === 'profile' && (
          <div>
            <h3 style={{textAlign: 'center', marginBottom: '20px'}}>ИНВЕНТАРЬ ({inventory.length})</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
              {inventory.map((item, i) => (
                <div key={i} style={{background: '#111', padding: '15px', borderRadius: '15px', textAlign: 'center', border: '1px solid #222'}}>
                  <div style={{fontSize: '30px'}}>{item.emoji}</div>
                  <div style={{fontSize: '8px', color: '#666', marginTop: '5px'}}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Экран процесса (чтобы не было просто черного фона) */}
        {opening && (
          <WinOverlay>
            <div style={{fontSize: '80px', animation: 'spin 2s linear infinite'}}>🍶</div>
            <h2 style={{marginTop: '20px', letterSpacing: '3px'}}>ЖИРИМ...</h2>
          </WinOverlay>
        )}

        {/* Экран победы */}
        {winItem && (
          <WinOverlay onClick={() => setWinItem(null)}>
            <div style={{animation: `${popIn} 0.5s ease-out`, textAlign: 'center'}}>
              <div style={{fontSize: '120px'}}>{winItem.emoji}</div>
              <h1 style={{fontSize: '32px', margin: '20px 0'}}>ВЫПАЛО!</h1>
              <p style={{color: '#00d2ff', fontWeight: 800}}>{winItem.name}</p>
              <button style={{marginTop: '40px', padding: '15px 40px', borderRadius: '20px', background: '#fff', border: 'none', fontWeight: 900}}>ЗАБРАТЬ</button>
            </div>
          </WinOverlay>
        )}

        <BottomNav>
          <NavItem $active={tab === 'cases'} onClick={() => setTab('cases')}><div>📦</div>КЕЙСЫ</NavItem>
          <NavItem $active={tab === 'rocket'} onClick={() => setTab('rocket')}><div>🚀</div>РАКЕТА</NavItem>
          <NavItem $active={tab === 'profile'} onClick={() => setTab('profile')}><div>👤</div>ПРОФИЛЬ</NavItem>
        </BottomNav>
      </AppContainer>
    </>
  );
}
