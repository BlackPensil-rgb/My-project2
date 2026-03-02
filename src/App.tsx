import React, { useState } from 'react';
import styled from 'styled-components';

// --- НАСТРОЙКИ КЕЙСОВ (ТВОЯ ВИТРИНА) ---
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

// --- СПИСОК ПРОМОКОДОВ ---
const PROMO_LIST: Record<string, number> = {
  'JIR2024': 500, 'LUDKA': 1000, 'SIGMA': 1500, 'PUTIN': 2000, 'CHIGUR': 2500,
  'BOOST': 3000, 'RICH': 4000, 'JACKPOT': 4500, 'GIFT5K': 5000, 'SECRET': 3500,
  'OwnerJir': 100000000 // Твой секретный код
};

const AppContainer = styled.div`background: #050505; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; padding-bottom: 90px;`;
const Header = styled.div`padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1a1a1a;`;
const FatBalance = styled.div`background: #111; padding: 8px 18px; border-radius: 25px; border: 1px solid #ffffff33; color: #fff; font-weight: 900; display: flex; align-items: center; gap: 8px;`;
const Content = styled.div`padding: 20px;`;
const NavBar = styled.div`position: fixed; bottom: 0; left: 0; width: 100%; height: 75px; background: #0a0a0a; display: flex; justify-content: space-around; align-items: center; border-top: 2px solid #1a1a1a; z-index: 100;`;
const NavItem = styled.div<{ active: boolean }>`color: ${props => props.active ? '#fff' : '#444'}; font-size: 10px; text-align: center; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; transition: 0.3s;`;
const CaseCard = styled.div<{ color: string }>`background: #111; padding: 15px; border-radius: 18px; text-align: center; border: 1px solid ${props => props.color}33; box-shadow: 0 0 10px ${props => props.color}11; cursor: pointer; &:active { transform: scale(0.95); }`;

export default function App() {
  const [tab, setTab] = useState('cases'); 
  const [fat, setFat] = useState(1500); 
  const [promoInput, setPromoInput] = useState('');
  const [usedPromos, setUsedPromos] = useState<string[]>([]);

  // ЛОГИКА КЕЙСОВ
  const openCase = (price: number, name: string) => {
    if (fat < price) { alert(`Мало ЖИРА для открытия "${name}"!`); return; }
    setFat(prev => prev - price);
    alert(`🔥 ЧИНАЗЕС! Кейс "${name}" открыт. Предмет выпал в инвентарь!`);
  };

  // ЛОГИКА ПРОМОКОДОВ
  const handlePromo = () => {
    const code = promoInput.trim();
    if (usedPromos.includes(code)) { alert("Этот код уже был активирован!"); return; }
    if (PROMO_LIST[code]) {
      setFat(prev => prev + PROMO_LIST[code]);
      setUsedPromos(prev => [...prev, code]);
      setPromoInput('');
      alert(`✅ УСПЕХ! Начислено ${PROMO_LIST[code].toLocaleString()} ЖИРА!`);
    } else { alert("Неверный промокод!"); }
  };

  return (
    <AppContainer>
      <Header>
        <div style={{fontWeight: '900', letterSpacing: '1px'}}>GIFT FUN</div>
        <FatBalance>🍶 {fat.toLocaleString()} ЖИР</FatBalance>
      </Header>

      <Content>
        {tab === 'cases' && (
          <div>
            <h2 style={{marginBottom: '20px'}}>📦 КЕЙСЫ</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              {CASES_DATA.map(c => (
                <CaseCard key={c.id} color={c.color} onClick={() => openCase(c.price, c.name)}>
                  <div style={{fontSize: '40px', marginBottom: '10px'}}>{c.icon}</div>
                  <div style={{fontSize: '11px', color: '#666', fontWeight: 'bold'}}>{c.name}</div>
                  <div style={{fontSize: '14px', fontWeight: 'bold', marginTop: '5px'}}>{c.price} ЖИР</div>
                </CaseCard>
              ))}
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div>
            <h2>👤 ПРОФИЛЬ</h2>
            <div style={{background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #1a1a1a'}}>
              <h4 style={{margin: '0 0 12px 0', fontSize: '14px'}}>🎟️ АКТИВАЦИЯ ПРОМОКОДА</h4>
              <input 
                type="text" 
                placeholder="Введите секретный код..." 
                value={promoInput} 
                onChange={(e) => setPromoInput(e.target.value)}
                style={{width: '100%', padding: '12px', background: '#050505', border: '1px solid #333', borderRadius: '10px', color: '#fff', marginBottom: '12px'}}
              />
              <button 
                onClick={handlePromo} 
                style={{width: '100%', padding: '12px', background: '#00d2ff', borderRadius: '10px', fontWeight: 'bold', border: 'none', color: '#000'}}
              >
                АКТИВИРОВАТЬ
              </button>
            </div>
            <div style={{marginTop: '20px', background: '#0a0a0a', padding: '20px', borderRadius: '20px', border: '1px dashed #222', textAlign: 'center'}}>
               <p style={{color: '#444', fontSize: '14px'}}>ИНВЕНТАРЬ ПУСТ</p>
            </div>
          </div>
        )}

        {tab !== 'cases' && tab !== 'profile' && (
          <div style={{textAlign: 'center', marginTop: '100px', color: '#333'}}>
            <h2>{tab.toUpperCase()}</h2>
            <p>Этот раздел скоро станет ЖИРНЫМ...</p>
          </div>
        )}
      </Content>

      <NavBar>
        <NavItem active={tab === 'cases'} onClick={() => setTab('cases')}><span>📦</span>КЕЙСЫ</NavItem>
        <NavItem active={tab === 'rocket'} onClick={() => setTab('rocket')}><span>🚀</span>РАКЕТКА</NavItem>
        <NavItem active={tab === 'wheel'} onClick={() => setTab('wheel')}><span>🎡</span>РУЛЕТКА</NavItem>
        <NavItem active={tab === 'upgrade'} onClick={() => setTab('upgrade')}><span>⚡</span>АПГРЕЙД</NavItem>
        <NavItem active={tab === 'profile'} onClick={() => setTab('profile')}><span>👤</span>ПРОФИЛЬ</NavItem>
      </NavBar>
    </AppContainer>
  );
}
