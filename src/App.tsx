import React, { useState } from 'react';
import styled from 'styled-components';

// --- СТИЛИ (ТЕМНЫЙ НЕОН, ВСЁ ПО ЧИНАЗЕ) ---
const AppContainer = styled.div`
  background: #050505; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; padding-bottom: 90px;
`;

const Header = styled.div`
  padding: 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1a1a1a;
`;

const FatBalance = styled.div`
  background: #111; padding: 8px 18px; border-radius: 25px; border: 1px solid #ffffff33; color: #fff; font-weight: 900; display: flex; align-items: center; gap: 8px; box-shadow: 0 0 15px rgba(255,255,255,0.05);
`;

const Content = styled.div` padding: 20px; `;

const NavBar = styled.div`
  position: fixed; bottom: 0; left: 0; width: 100%; height: 75px; background: #0a0a0a; 
  display: flex; justify-content: space-around; align-items: center; border-top: 2px solid #1a1a1a; z-index: 100;
`;

const NavItem = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#fff' : '#444'}; font-size: 10px; text-align: center; cursor: pointer; transition: 0.3s;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
`;

const CaseCard = styled.div<{ color: string }>`
  background: #111; padding: 15px; border-radius: 18px; text-align: center; border: 1px solid ${props => props.color}33;
  box-shadow: 0 0 10px ${props => props.color}11;
`;

// --- ГЛАВНЫЙ КОМПОНЕНТ ---
export default function App() {
  const [tab, setTab] = useState('cases'); 
  const [fat, setFat] = useState(1500); // Твой БАЛАНС ЖИРА

  return (
    <AppContainer>
      <Header>
        <div style={{fontWeight: '900', fontSize: '18px', letterSpacing: '1px'}}>GIFT FUN</div>
        <FatBalance>🍶 {fat} ЖИР</FatBalance>
      </Header>

      <Content>
        {/* КЕЙСЫ (ГЛАВНАЯ) */}
        {tab === 'cases' && (
          <div>
            <h2 style={{marginBottom: '20px'}}>📦 КЕЙСЫ</h2>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <CaseCard color="#00d2ff">🍶<br/><small style={{color: '#666'}}>ПРИВЕТ ЛУДКА</small><br/><b>50 ЖИР</b></CaseCard>
              <CaseCard color="#ff00ff">🍶<br/><small style={{color: '#666'}}>ХОЛОДНЫЙ МИНИМУМ</small><br/><b>150 ЖИР</b></CaseCard>
              <CaseCard color="#ffff00">🍶<br/><small style={{color: '#666'}}>ЖИРНЫЙ КУШ</small><br/><b>500 ЖИР</b></CaseCard>
              <CaseCard color="#ff0000">🍶<br/><small style={{color: '#666'}}>DEPARTMENT ELITE</small><br/><b>1000 ЖИР</b></CaseCard>
            </div>
          </div>
        )}

        {/* РАКЕТКА */}
        {tab === 'rocket' && (
          <div style={{textAlign: 'center'}}>
            <h2>🚀 РАКЕТКА</h2>
            <div style={{height: '200px', background: '#0a0a0a', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #1a1a1a', marginBottom: '20px'}}>
              <h1 style={{fontSize: '56px', color: '#00d2ff', textShadow: '0 0 20px #00d2ff44'}}>x1.49</h1>
            </div>
            <button style={{width: '100%', padding: '18px', borderRadius: '15px', background: '#00d2ff', color: '#000', border: 'none', fontWeight: '900', fontSize: '16px'}}>ПОСТАВИТЬ ЖИР</button>
          </div>
        )}

        {/* РУЛЕТКА (ПОЛУКРУГ) */}
        {tab === 'wheel' && (
          <div style={{textAlign: 'center'}}>
            <h2>🎡 РУЛЕТКА</h2>
            <div style={{width: '260px', height: '130px', border: '3px solid #1a1a1a', borderBottom: 'none', borderRadius: '130px 130px 0 0', margin: '30px auto', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <p style={{color: '#333', fontSize: '12px'}}>КОЛЕСО ЖИРА</p>
            </div>
            <div style={{display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px'}}>
              {['+100', '+500', 'МАКС'].map(b => <button key={b} style={{background: '#111', border: '1px solid #222', color: '#fff', padding: '12px 20px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'}}>{b}</button>)}
            </div>
          </div>
        )}

        {/* АПГРЕЙД (101 УРОВЕНЬ) */}
        {tab === 'upgrade' && (
          <div style={{textAlign: 'center'}}>
            <h2>⚡ АПГРЕЙД</h2>
            <div style={{background: '#111', padding: '40px 20px', borderRadius: '25px', border: '1px solid #1a1a1a', marginTop: '20px', position: 'relative'}}>
               <div style={{fontSize: '60px', marginBottom: '10px'}}>🎁</div>
               <div style={{fontWeight: '900', color: '#00d2ff'}}>УРОВЕНЬ 1 / 101</div>
               <div style={{fontSize: '12px', color: '#444', marginTop: '5px'}}>ЦЕЛЬ: DEPARTMENT</div>
            </div>
            <button style={{width: '100%', padding: '18px', borderRadius: '15px', background: 'linear-gradient(90deg, #00d2ff, #0055ff)', border: 'none', color: '#fff', fontWeight: '900', marginTop: '20px', fontSize: '16px'}}>УЛУЧШИТЬ ЖИР</button>
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {tab === 'profile' && (
          <div>
            <h2>👤 ПРОФИЛЬ</h2>
            <div style={{background: '#111', padding: '20px', borderRadius: '20px', border: '1px solid #1a1a1a', marginBottom: '15px'}}>
              <div style={{fontSize: '12px', color: '#444'}}>ТВОЙ ID:</div>
              <div style={{fontSize: '20px', fontWeight: '900'}}>12345678</div>
              <div style={{fontSize: '12px', color: '#444', marginTop: '15px'}}>КЭШБЭК ЖИРОМ: 5%</div>
              <div style={{height: '8px', background: '#050505', borderRadius: '10px', marginTop: '8px', overflow: 'hidden'}}>
                <div style={{width: '35%', height: '100%', background: '#00d2ff', borderRadius: '10px'}}></div>
              </div>
            </div>
            <div style={{background: '#0a0a0a', padding: '20px', borderRadius: '20px', border: '1px dashed #222', textAlign: 'center'}}>
               <div style={{color: '#333', fontSize: '14px', fontWeight: 'bold'}}>ИНВЕНТАРЬ ПУСТ</div>
            </div>
          </div>
        )}
      </Content>

      <NavBar>
        <NavItem active={tab === 'cases'} onClick={() => setTab('cases')}><span style={{fontSize: '22px'}}>📦</span>КЕЙСЫ</NavItem>
        <NavItem active={tab === 'rocket'} onClick={() => setTab('rocket')}><span style={{fontSize: '22px'}}>🚀</span>РАКЕТКА</NavItem>
        <NavItem active={tab === 'wheel'} onClick={() => setTab('wheel')}><span style={{fontSize: '22px'}}>🎡</span>РУЛЕТКА</NavItem>
        <NavItem active={tab === 'upgrade'} onClick={() => setTab('upgrade')}><span style={{fontSize: '22px'}}>⚡</span>АПГРЕЙД</NavItem>
        <NavItem active={tab === 'profile'} onClick={() => setTab('profile')}><span style={{fontSize: '22px'}}>👤</span>ПРОФИЛЬ</NavItem>
      </NavBar>
    </AppContainer>
  );
}
