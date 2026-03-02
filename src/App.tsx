import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { ALL_GIFTS } from './GiftsData';

const GlobalStyle = createGlobalStyle`
  body { margin: 0; background: #000; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
`;

const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;
const popIn = keyframes`0% { transform: scale(0.5); opacity: 0; } 100% { transform: scale(1); opacity: 1; }`;

const AppContainer = styled.div`min-height: 100vh; padding: 20px 20px 140px 20px; max-width: 500px; margin: 0 auto;`;
const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;`;
const Balance = styled.div`background: #111; border: 1px solid #222; padding: 10px 18px; border-radius: 25px; color: #00d2ff; font-weight: 800; font-size: 15px;`;

const CaseGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 15px;`;
const CaseCard = styled.div<{ $color: string }>`
  background: linear-gradient(180deg, #0d0d0d 0%, #050505 100%);
  border-radius: 30px; padding: 25px 15px; text-align: center;
  border: 1px solid ${p => p.$color}22; transition: 0.2s;
  &:active { transform: scale(0.95); }
`;

const Overlay = styled.div`position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 10000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: ${fadeIn} 0.3s; padding: 20px; text-align: center;`;

const BottomNav = styled.div`
  position: fixed; bottom: 25px; left: 20px; right: 20px; height: 75px;
  background: rgba(15,15,15,0.9); backdrop-filter: blur(15px); border-radius: 35px;
  display: flex; justify-content: space-around; align-items: center; border: 1px solid #222; z-index: 1000;
`;

const NavItem = styled.div<{ $active: boolean }>`
  color: ${p => p.$active ? '#fff' : '#444'}; text-align: center; transition: 0.3s;
  div:first-child { font-size: 24px; }
  label { font-size: 10px; font-weight: 900; text-transform: uppercase; margin-top: 4px; display: block; }
`;

// --- ВСЕ 16 КЕЙСОВ ---
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
  const [status, setStatus] = useState<'idle' | 'opening' | 'win'>('idle');
  const [winItem, setWinItem] = useState<any>(null);
  const [promo, setPromo] = useState('');

  useEffect(() => {
    localStorage.setItem('fat', fat.toString());
    localStorage.setItem('inv', JSON.stringify(inventory));
  }, [fat, inventory]);

  const handleOpen = (c: any) => {
    if (fat < c.price) return alert("❌ Мало ЖИРА!");
    setStatus('opening');
    setTimeout(() => {
      const range = c.id === 5 ? 101 : 40;
      const gift = ALL_GIFTS[Math.floor(Math.random() * Math.min(range, ALL_GIFTS.length))] || ALL_GIFTS[0];
      setFat(prev => prev - c.price);
      setInventory(prev => [gift, ...prev]);
      setWinItem(gift);
      setStatus('win');
    }, 1200);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <div style={{fontWeight: 900, fontSize: '22px'}}>GIFT FUN</div>
          <Balance>🍶 {fat.toLocaleString()}</Balance>
        </Header>

        {tab === 'cases' && (
          <CaseGrid>
            {CASES_DATA.map(c => (
              <CaseCard key={c.id} $color={c.color} onClick={() => handleOpen(c)}>
                <div style={{fontSize: '55px', marginBottom: '10px'}}>{c.icon}</div>
                <div style={{fontSize: '11px', fontWeight: 900, color: c.color}}>{c.name}</div>
                <div style={{fontSize: '13px', color: '#555', fontWeight: 700, marginTop: '4px'}}>{c.price} ЖИР</div>
              </CaseCard>
            ))}
          </CaseGrid>
        )}

        {tab === 'profile' && (
          <div style={{animation: `${fadeIn} 0.3s`}}>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
              <div style={{width: '90px', height: '90px', background: '#111', borderRadius: '50%', margin: '0 auto 15px', border: '2px solid #00d2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px'}}>👤</div>
              <div style={{fontSize: '22px', fontWeight: 900}}>ИГРОК</div>
              <div style={{color: '#00d2ff', fontWeight: 800, marginTop: '5px'}}>🍶 {fat.toLocaleString()} ЖИР</div>
            </div>
            
            <div style={{background: '#0a0a0a', padding: '15px', borderRadius: '20px', marginBottom: '20px', border: '1px solid #111'}}>
              <input placeholder="Введи промокод..." value={promo} onChange={e => setPromo(e.target.value)} style={{width: '100%', padding: '12px', background: '#000', border: '1px solid #222', color: '#fff', borderRadius: '12px', marginBottom: '10px'}} />
              <button style={{width: '100%', padding: '12px', background: '#00d2ff', border: 'none', borderRadius: '12px', fontWeight: 900}}>АКТИВИРОВАТЬ</button>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
              {inventory.map((item, i) => (
                <div key={i} style={{background: '#0d0d0d', padding: '15px', borderRadius: '18px', textAlign: 'center', border: '1px solid #1a1a1a'}}>
                  <div style={{fontSize: '32px'}}>{item.emoji}</div>
                  <div style={{fontSize: '9px', color: '#666', marginTop: '5px', fontWeight: 800}}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {status === 'opening' && (
          <Overlay><div style={{fontSize: '80px', animation: 'spin 2s linear infinite'}}>🍶</div><h2 style={{marginTop: '20px', letterSpacing: '4px'}}>ЖИРИМ...</h2></Overlay>
        )}

        {status === 'win' && winItem && (
          <Overlay onClick={() => setStatus('idle')}>
            <div style={{animation: `${popIn} 0.5s ease-out`}}>
              <div style={{fontSize: '130px', filter: 'drop-shadow(0 0 30px #00d2ff55)'}}>{winItem.emoji}</div>
              <h1 style={{fontSize: '40px', fontWeight: 900, margin: '25px 0 10px'}}>ЧИНАЗЕС!</h1>
              <div style={{fontSize: '20px', color: '#00d2ff', fontWeight: 800}}>{winItem.name}</div>
              <button style={{marginTop: '45px', padding: '18px 60px', borderRadius: '25px', background: '#fff', color: '#000', border: 'none', fontWeight: 900, fontSize: '16px'}}>В ИНВЕНТАРЬ</button>
            </div>
          </Overlay>
        )}

        <BottomNav>
          <NavItem $active={tab === 'cases'} onClick={() => setTab('cases')}><div>📦</div><label>Кейсы</label></NavItem>
          <NavItem $active={tab === 'rocket'} onClick={() => setTab('rocket')}><div>🚀</div><label>Ракета</label></NavItem>
          <NavItem $active={tab === 'profile'} onClick={() => setTab('profile')}><div>👤</div><label>Профиль</label></NavItem>
        </BottomNav>
      </AppContainer>
    </>
  );
}
