import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { ALL_GIFTS } from './GiftsData';

// --- ГЛОБАЛЬНЫЕ СТИЛИ ---
const GlobalStyle = createGlobalStyle`
  body { margin: 0; background: #000; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
`;

// --- АНИМАЦИИ ---
const fadeIn = keyframes`from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); }`;
const float = keyframes`0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); }`;
const pulse = keyframes`0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); }`;

// --- СТИЛИ ИНТЕРФЕЙСА ---
const AppContainer = styled.div`min-height: 100vh; padding: 20px 20px 140px 20px; max-width: 500px; margin: 0 auto;`;

const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; position: sticky; top: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 50; padding: 10px 0;`;
const Logo = styled.div`font-size: 22px; font-weight: 900; letter-spacing: -1px; color: #fff;`;
const Balance = styled.div`background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 10px 18px; border-radius: 25px; display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; color: #00d2ff; box-shadow: 0 4px 15px rgba(0, 210, 255, 0.1);`;

const CaseGrid = styled.div`display: grid; grid-template-columns: 1fr 1fr; gap: 15px;`;

const CaseCard = styled.div<{ $color: string }>`
  background: linear-gradient(180deg, #111 0%, #050505 100%);
  border-radius: 30px; padding: 30px 15px; text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.03); position: relative;
  transition: transform 0.2s; animation: ${fadeIn} 0.5s ease;

  &:active { transform: scale(0.95); }
  &::after { content: ''; position: absolute; inset: 0; border-radius: 30px; border: 1px solid ${p => p.$color}; opacity: 0.15; }
`;

const CaseIcon = styled.div`font-size: 60px; margin-bottom: 15px; animation: ${float} 3s ease-in-out infinite; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));`;
const CaseTitle = styled.div`font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;`;
const PriceTag = styled.div`font-size: 13px; color: #666; font-weight: 700;`;

const WinOverlay = styled.div`position: fixed; inset: 0; background: rgba(0,0,0,0.98); z-index: 2000; display: flex; flex-direction: column; align-items: center; justify-content: center; animation: ${fadeIn} 0.3s; padding: 20px; text-align: center;`;

const BottomNav = styled.div`
  position: fixed; bottom: 25px; left: 20px; right: 20px; height: 75px;
  background: rgba(15, 15, 15, 0.8); backdrop-filter: blur(20px);
  border-radius: 35px; border: 1px solid rgba(255,255,255,0.08);
  display: flex; justify-content: space-around; align-items: center; z-index: 100;
`;

const NavItem = styled.div<{ $active: boolean }>`
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  color: ${p => p.$active ? '#fff' : '#444'}; opacity: ${p => p.$active ? 1 : 0.6};
  transition: 0.3s; font-size: 24px;
  label { font-size: 10px; font-weight: 900; text-transform: uppercase; }
`;

// --- ДАННЫЕ КЕЙСОВ (Твой полный список) ---
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
    if (fat < c.price) return alert("❌ Братан, маловато ЖИРА!");
    setOpening(true);
    
    setTimeout(() => {
      // Логика выпадения из ALL_GIFTS
      const range = c.id === 5 ? 101 : 40;
      const luckyIndex = Math.floor(Math.random() * Math.min(range, ALL_GIFTS.length));
      const gift = ALL_GIFTS[luckyIndex];

      if (gift) {
        setFat(f => f - c.price);
        setInventory(prev => [gift, ...prev]);
        setWinItem(gift);
      }
      setOpening(false);
    }, 1500);
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Logo>GIFT FUN</Logo>
          <Balance>🍶 {fat.toLocaleString()} ЖИР</Balance>
        </Header>

        {tab === 'cases' && (
          <CaseGrid>
            {CASES_DATA.map(c => (
              <CaseCard key={c.id} $color={c.color} onClick={() => handleOpen(c)}>
                <CaseIcon>{c.icon}</CaseIcon>
                <CaseTitle style={{color: c.color}}>{c.name}</CaseTitle>
                <PriceTag>{c.price} ЖИР</PriceTag>
              </CaseCard>
            ))}
          </CaseGrid>
        )}

        {tab === 'profile' && (
          <div>
            <h2 style={{fontSize: '20px', fontWeight: 900, marginBottom: '20px', textAlign: 'center'}}>📦 ИНВЕНТАРЬ ({inventory.length})</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px'}}>
              {inventory.map((item, i) => (
                <div key={i} style={{background: '#0d0d0d', padding: '15px', border: '1px solid #1a1a1a', borderRadius: '20px', textAlign: 'center'}}>
                  <div style={{fontSize: '35px'}}>{item.emoji}</div>
                  <div style={{fontSize: '9px', color: '#555', marginTop: '5px', fontWeight: 800}}>{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ЭКРАНЫ ОЖИДАНИЯ И ВЫИГРЫША */}
        {opening && (
          <WinOverlay>
            <div style={{fontSize: '100px', animation: pulse + ' 0.8s infinite'}}>📦</div>
            <h2 style={{letterSpacing: '5px', marginTop: '30px', fontWeight: 900}}>ОТКРЫВАЕМ...</h2>
          </WinOverlay>
        )}

        {winItem && (
          <WinOverlay onClick={() => setWinItem(null)}>
            <div style={{fontSize: '120px', animation: fadeIn + ' 0.5s ease'}}>{winItem.emoji}</div>
            <h1 style={{fontSize: '36px', fontWeight: 900, margin: '20px 0 10px 0'}}>ЧИНАЗЕС!</h1>
            <p style={{fontSize: '18px', color: '#00d2ff', fontWeight: 800}}>{winItem.name}</p>
            <button style={{marginTop: '40px', padding: '18px 50px', borderRadius: '25px', background: '#fff', color: '#000', border: 'none', fontWeight: 900, fontSize: '16px'}}>В ИНВЕНТАРЬ</button>
          </WinOverlay>
        )}

        <BottomNav>
          <NavItem $active={tab === 'cases'} onClick={() => setTab('cases')}><span>📦</span><label>Кейсы</label></NavItem>
          <NavItem $active={tab === 'rocket'} onClick={() => setTab('rocket')}><span>🚀</span><label>Ракета</label></NavItem>
          <NavItem $active={tab === 'profile'} onClick={() => setTab('profile')}><span>👤</span><label>Профиль</label></NavItem>
        </BottomNav>
      </AppContainer>
    </>
  );
   }
