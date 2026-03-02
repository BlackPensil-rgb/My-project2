<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Жир-Казино</title>
    <style>
        :root {
            --bg: #1a1a1a;
            --card: #2a2a2a;
            --accent: #ffcc00;
            --text: #ffffff;
        }
        body { font-family: 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; }
        .header { display: flex; justify-content: space-between; align-items: center; background: var(--card); padding: 15px 30px; border-radius: 15px; margin-bottom: 20px; }
        .balance { font-size: 24px; color: var(--accent); font-weight: bold; }
        .nav { display: flex; gap: 10px; margin-bottom: 20px; overflow-x: auto; padding-bottom: 10px; }
        button { cursor: pointer; padding: 10px 20px; border: none; border-radius: 8px; background: #444; color: white; transition: 0.3s; }
        button:hover { background: #555; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-active { background: var(--accent) !important; color: black; font-weight: bold; }
        
        .game-section { display: none; background: var(--card); padding: 20px; border-radius: 15px; min-height: 400px; }
        .active { display: block; }

        /* Кейсы */
        .cases-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }
        .case-card { background: #333; padding: 15px; text-align: center; border-radius: 10px; border: 1px solid #444; }
        
        /* Инвентарь */
        .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
        .item-card { background: #333; padding: 10px; border-radius: 8px; text-align: center; font-size: 14px; border: 1px solid #555; }
        .sell-btn { background: #e74c3c; width: 100%; margin-top: 5px; font-size: 12px; padding: 5px; }

        /* Промокоды */
        .promo-box { margin-top: 20px; display: flex; gap: 10px; }
        input { padding: 10px; border-radius: 8px; border: none; flex-grow: 1; background: #333; color: white; }

        /* Мины */
        .mines-grid { display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center; margin-top: 20px; }
        .mine-cell { width: 50px; height: 50px; background: #444; display: flex; align-items: center; justify-content: center; border-radius: 5px; cursor: pointer; font-size: 20px; }
        .mine-cell.open { background: #2ecc71; cursor: default; }
        .mine-cell.boom { background: #e74c3c; }

        /* Ракетка (Краш) */
        .crash-display { height: 150px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: var(--accent); border: 2px solid #444; border-radius: 10px; margin-bottom: 10px; font-family: monospace; }

        /* Рулетка */
        .roulette-container { text-align: center; }
        .roulette-tape { display: flex; overflow: hidden; height: 60px; border: 2px solid #555; margin: 10px 0; position: relative; background: #111; align-items: center; justify-content: center; font-size: 24px; }
    </style>
</head>
<body>

<div class="header">
    <div><strong>ЖИР-CASINO</strong></div>
    <div class="balance">Баланс: <span id="balance-val">1000</span> Жира</div>
</div>

<div class="nav">
    <button onclick="showGame('cases')" id="btn-cases" class="btn-active">Кейсы</button>
    <button onclick="showGame('mines')" id="btn-mines">Мины</button>
    <button onclick="showGame('crash')" id="btn-crash">Ракетка</button>
    <button onclick="showGame('roulette')" id="btn-roulette">Рулетка</button>
    <button onclick="showGame('profile')" id="btn-profile">Профиль</button>
</div>

<!-- Кейсы -->
<div id="game-cases" class="game-section active">
    <h3>Магазин кейсов</h3>
    <div class="cases-grid" id="cases-list"></div>
</div>

<!-- Мины -->
<div id="game-mines" class="game-section">
    <h3>Мины</h3>
    <p>Ставка: 100 Жира. Найди алмазы 💎, не взорвись на бомбе 💣!</p>
    <div class="mines-grid" id="mines-board"></div>
    <button id="mines-start-btn" style="margin-top:15px; width:100%" onclick="startMines()">Начать игру (100)</button>
    <button id="mines-cashout-btn" style="margin-top:10px; width:100%; background: #2ecc71; display:none;" onclick="cashoutMines()">Забрать выигрыш</button>
</div>

<!-- Краш -->
<div id="game-crash" class="game-section">
    <h3>Ракетка (Crash)</h3>
    <div class="crash-display" id="crash-val">1.00x</div>
    <button id="crash-btn" onclick="handleCrashClick()" style="width:100%; height: 50px; background: #3498db;">ПОСТАВИТЬ 500</button>
</div>

<!-- Рулетка -->
<div id="game-roulette" class="game-section">
    <h3>Простая Рулетка</h3>
    <div class="roulette-tape" id="roulette-tape">Жмите кнопку для игры</div>
    <div style="display:flex; gap:10px; justify-content: center; margin-top: 20px;">
        <button onclick="playRoulette('red', 100)" style="background: #e74c3c;">Красное x2 (100)</button>
        <button onclick="playRoulette('green', 100)" style="background: #2ecc71;">Зеленое x14 (100)</button>
        <button onclick="playRoulette('black', 100)" style="background: #333;">Черное x2 (100)</button>
    </div>
</div>

<!-- Профиль -->
<div id="game-profile" class="game-section">
    <h3>Ваш инвентарь</h3>
    <div class="inventory-grid" id="inventory-list"></div>
    <div class="promo-box">
        <input type="text" id="promo-input" placeholder="Введите промокод (например: START)">
        <button onclick="applyPromo()">ОК</button>
    </div>
</div>

<script>
    // --- Состояние игры ---
    let state = {
        balance: 1000,
        inventory: [],
        mines: { active: false, board: [], bombs: [], bet: 100, multiplier: 1 },
        crash: { active: false, multiplier: 1.0, bet: 500, interval: null, isRunning: false }
    };

    const items = [
        { name: "Ржавая вилка", price: 10, rarity: "common" },
        { name: "Котлета", price: 50, rarity: "common" },
        { name: "Золотой батон", price: 500, rarity: "rare" },
        { name: "Жирный Слиток", price: 2500, rarity: "epic" },
        { name: "Корона Жира", price: 10000, rarity: "legendary" }
    ];

    const cases = [
        { name: "Бомж-кейс", cost: 50, items: [0, 1] },
        { name: "Обед школьника", cost: 200, items: [1, 2] },
        { name: "Богатый жир", cost: 1000, items: [2, 3, 4] }
    ];

    // --- Инициализация ---
    function updateUI() {
        document.getElementById('balance-val').innerText = Math.floor(state.balance);
        renderInventory();
    }

    function showGame(gameId) {
        document.querySelectorAll('.game-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav button').forEach(b => b.classList.remove('btn-active'));
        document.getElementById('game-' + gameId).classList.add('active');
        document.getElementById('btn-' + gameId).classList.add('btn-active');
    }

    // --- Кейсы ---
    function renderCases() {
        const container = document.getElementById('cases-list');
        container.innerHTML = '';
        cases.forEach((c, idx) => {
            container.innerHTML += `
                <div class="case-card">
                    <h4>${c.name}</h4>
                    <p>${c.cost} Жира</p>
                    <button onclick="openCase(${idx})">Открыть</button>
                </div>
            `;
        });
    }

    function openCase(idx) {
        const c = cases[idx];
        if (state.balance < c.cost) return alert("Недостаточно жира!");
        
        state.balance -= c.cost;
        const randomItemIdx = c.items[Math.floor(Math.random() * c.items.length)];
        const item = items[randomItemIdx];
        
        state.inventory.push({...item, id: Date.now()});
        alert(`Выпало: ${item.name}!`);
        updateUI();
    }

    // --- Инвентарь ---
    function renderInventory() {
        const list = document.getElementById('inventory-list');
        list.innerHTML = state.inventory.length === 0 ? '<p>Пусто...</p>' : '';
        state.inventory.forEach((item, idx) => {
            list.innerHTML += `
                <div class="item-card">
                    <div>${item.name}</div>
                    <div style="color: #ffcc00">${item.price} Ж</div>
                    <button class="sell-btn" onclick="sellItem(${idx})">Продать</button>
                </div>
            `;
        });
    }

    function sellItem(idx) {
        state.balance += state.inventory[idx].price;
        state.inventory.splice(idx, 1);
        updateUI();
    }

    // --- Мины ---
    function startMines() {
        if (state.balance < 100) return alert("Мало жира!");
        state.balance -= 100;
        state.mines.active = true;
        state.mines.multiplier = 1.0;
        state.mines.bombs = [];
        while(state.mines.bombs.length < 5) {
            let r = Math.floor(Math.random() * 25);
            if(!state.mines.bombs.includes(r)) state.mines.bombs.push(r);
        }
        
        const board = document.getElementById('mines-board');
        board.innerHTML = '';
        for(let i=0; i<25; i++) {
            const cell = document.createElement('div');
            cell.className = 'mine-cell';
            cell.onclick = () => clickMine(i, cell);
            board.appendChild(cell);
        }
        document.getElementById('mines-start-btn').style.display = 'none';
        document.getElementById('mines-cashout-btn').style.display = 'block';
        document.getElementById('mines-cashout-btn').innerText = `Забрать (x1.00)`;
        updateUI();
    }

    function clickMine(idx, el) {
        if(!state.mines.active || el.classList.contains('open')) return;
        
        if(state.mines.bombs.includes(idx)) {
            el.classList.add('boom');
            el.innerText = '💣';
            state.mines.active = false;
            alert("БУМ! Вы проиграли.");
            setTimeout(resetMines, 1500);
        } else {
            el.classList.add('open');
            el.innerText = '💎';
            state.mines.multiplier += 0.3;
            document.getElementById('mines-cashout-btn').innerText = `Забрать (x${state.mines.multiplier.toFixed(2)})`;
        }
    }

    function cashoutMines() {
        if(!state.mines.active) return;
        const win = 100 * state.mines.multiplier;
        state.balance += win;
        alert(`Вы забрали ${win.toFixed(0)} Жира!`);
        resetMines();
        updateUI();
    }

    function resetMines() {
        state.mines.active = false;
        document.getElementById('mines-start-btn').style.display = 'block';
        document.getElementById('mines-cashout-btn').style.display = 'none';
        document.getElementById('mines-board').innerHTML = '';
    }

    // --- Краш (Ракетка) ---
    function handleCrashClick() {
        if (!state.crash.isRunning) {
            startCrash();
        } else {
            cashoutCrash();
        }
    }

    function startCrash() {
        if (state.balance < 500) return alert("Нужно 500 жира!");
        state.balance -= 500;
        state.crash.isRunning = true;
        state.crash.multiplier = 1.0;
        const btn = document.getElementById('crash-btn');
        btn.innerText = "ЗАБРАТЬ!";
        btn.style.background = "#e67e22";
        
        const crashPoint = Math.random() * 5 + 1; // Случайный момент взрыва
        
        state.crash.interval = setInterval(() => {
            state.crash.multiplier += 0.02;
            document.getElementById('crash-val').innerText = state.crash.multiplier.toFixed(2) + "x";
            
            if (state.crash.multiplier >= crashPoint) {
                clearInterval(state.crash.interval);
                state.crash.isRunning = false;
                document.getElementById('crash-val').innerText = "ВЗРЫВ! 💥";
                btn.innerText = "ПОСТАВИТЬ 500";
                btn.style.background = "#3498db";
                updateUI();
            }
        }, 100);
        updateUI();
    }

    function cashoutCrash() {
        if (!state.crash.isRunning) return;
        clearInterval(state.crash.interval);
        state.crash.isRunning = false;
        const win = 500 * state.crash.multiplier;
        state.balance += win;
        alert(`Успех! Выигрыш: ${win.toFixed(0)}`);
        document.getElementById('crash-btn').innerText = "ПОСТАВИТЬ 500";
        document.getElementById('crash-btn').style.background = "#3498db";
        updateUI();
    }

    // --- Рулетка ---
    function playRoulette(color, bet) {
        if (state.balance < bet) return alert("Мало жира!");
        state.balance -= bet;
        
        const tape = document.getElementById('roulette-tape');
        tape.innerText = "Крутим...";
        
        setTimeout(() => {
            const res = Math.floor(Math.random() * 15); // 0-14
            let winColor = "";
            if (res === 0) winColor = "green";
            else if (res % 2 === 0) winColor = "red";
            else winColor = "black";
            
            tape.innerText = `Выпало: ${res} (${winColor})`;
            
            if (color === winColor) {
                const mult = (winColor === 'green') ? 14 : 2;
                state.balance += bet * mult;
                alert("Победа!");
            }
            updateUI();
        }, 800);
    }

    // --- Промокоды ---
    function applyPromo() {
        const code = document.getElementById('promo-input').value.toUpperCase();
        if (code === 'START') {
            state.balance += 5000;
            alert("Промокод активирован! +5000 Жира");
            document.getElementById('promo-input').value = '';
        } else {
            alert("Неверный код");
        }
        updateUI();
    }

    // Старт
    renderCases();
    updateUI();
</script>

</body>
</html>
