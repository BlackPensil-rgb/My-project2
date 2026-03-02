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
        .btn-active { background: var(--accent) !important; color: black; font-weight: bold; }
        
        .game-section { display: none; background: var(--card); padding: 20px; border-radius: 15px; min-height: 400px; }
        .active { display: block; }

        /* Кейсы */
        .cases-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; }
        .case-card { background: #333; padding: 15px; text-align: center; border-radius: 10px; border: 1px solid #444; }
        
        /* Инвентарь */
        .inventory-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
        .item-card { background: #333; padding: 10px; border-radius: 8px; text-align: center; font-size: 14px; }
        .sell-btn { background: #e74c3c; width: 100%; margin-top: 5px; font-size: 12px; }

        /* Промокоды */
        .promo-box { margin-top: 20px; display: flex; gap: 10px; }
        input { padding: 10px; border-radius: 8px; border: none; flex-grow: 1; }

        /* Мины */
        .mines-grid { display: grid; grid-template-columns: repeat(5, 50px); gap: 5px; justify-content: center; }
        .mine-cell { width: 50px; height: 50px; background: #444; display: flex; align-items: center; justify-content: center; border-radius: 5px; cursor: pointer; }
        .mine-cell.open { background: #2ecc71; }
        .mine-cell.boom { background: #e74c3c; }

        /* Ракетка (Краш) */
        .crash-display { height: 150px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: var(--accent); border: 2px solid #444; border-radius: 10px; margin-bottom: 10px; }

        /* Рулетка */
        .roulette-container { text-align: center; }
        .roulette-tape { display: flex; overflow: hidden; height: 60px; border: 2px solid #555; margin: 10px 0; position: relative; }
        .roulette-item { min-width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    </style>
</head>
<body>

<div class="header">
    <div><strong>ЖИР-CASINO</strong></div>
    <div class="balance">Баланс: <span id="balance-val">0</span> Жира</div>
</div>

<div class="nav">
    <button onclick="showGame('cases')" id="btn-cases" class="btn-active">Кейсы</button>
    <button onclick="showGame('mines')" id="btn-mines">Мины</button>
    <button onclick="showGame('crash')" id="btn-crash">Ракетка</button>
    <button onclick="showGame('roulette')" id="btn-roulette">Рулетка</button>
    <button onclick="showGame('profile')" id="btn-profile">Профиль</button>
</div>

<!-- Секция Кейсы -->
<div id="game-cases" class="game-section active">
    <h3>Магазин кейсов</h3>
    <div class="cases-grid" id="cases-list"></div>
</div>

<!-- Секция Мины -->
<div id="game-mines" class="game-section">
    <h3>Мины</h3>
    <p>Ставка: 100 Жира. Найди алмазы, не взорвись!</p>
    <div class="mines-grid" id="mines-board"></div>
    <button style="margin-top:15px; width:100%" onclick="initMines()">Начать новую игру</button>
</div>

<!-- Секция Краш -->
<div id="game-crash" class="game-section">
    <h3>Ракетка (Crash)</h3>
    <div class="crash-display" id="crash-val">1.00x</div>
    <button id="crash-btn" onclick="startCrash()" style="width:100%; height: 50px;">СТАРТ (Ставка 500)</button>
</div>

<!-- Секция Рулетка -->
<div id="game-roulette" class="game-section">
    <h3>Рулетка</h3>
    <div class="roulette-tape" id="roulette-tape"></div>
    <div style="display:flex; gap:10px; justify-content: center;">
        <button onclick="playRoulette('red')" style="background: #e74c3c;">Красное x2</button>
        <button onclick="playRoulette('green')" style="background: #2ecc71;">Зеленое x14</button>
        <button onclick="playRoulette('black')" style="background: #333;">Черное x2</button>
    </div>
</div>

<!-- Секция Профиль -->
<div id="game-profile" class="game-section">
    <h3>Ваш инвентарь</h3>
    <div class="inventory-grid" id="inventory-list"></div>
    
    <div class="promo-box">
        <input type="text" id="promo-input" placeholder="Введите промокод...">
        <button onclick="applyPromo()">Активировать</button>
    </div>
</div>

<script>
    // --- ДАННЫЕ И ЛОГИКА ---
    let balance = parseInt(localStorage.getItem('zhir_balance')) || 1000;
    let inventory = JSON.parse(localStorage.getItem('zhir_inv')) || [];

    const CASES = [
        { id: 1, name: "Бомж Кейс", price: 100, items: [{n: "Сухарики", p: 10}, {n: "Медь", p: 150}] },
        { id: 2, name: "Средний Кейс", price: 1000, items: [{n: "Телефон", p: 800}, {n: "Часы", p: 2500}] },
        { id: 3, name: "Олигарх", price: 10000, items: [{n: "Машина", p: 8000}, {n: "Яхта", p: 50000}] }
    ];

    function updateUI() {
        document.getElementById('balance-val').innerText = balance.toLocaleString();
        localStorage.setItem('zhir_balance', balance);
        localStorage.setItem('zhir_inv', JSON.stringify(inventory));
        renderInventory();
    }

    function showGame(game) {
        document.querySelectorAll('.game-section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav button').forEach(b => b.classList.remove('btn-active'));
        document.getElementById('game-' + game).classList.add('active');
        document.getElementById('btn-' + game).classList.add('btn-active');
    }

    // Логика Кейсов
    function renderCases() {
        const list = document.getElementById('cases-list');
        list.innerHTML = '';
        CASES.forEach(c => {
            list.innerHTML += `
                <div class="case-card">
                    <h4>${c.name}</h4>
                    <p>${c.price} Жира</p>
                    <button onclick="openCase(${c.id})">Открыть</button>
                </div>
            `;
        });
    }

    function openCase(id) {
        const c = CASES.find(x => x.id === id);
        if (balance >= c.price) {
            balance -= c.price;
            const win = c.items[Math.floor(Math.random() * c.items.length)];
            inventory.push({ ...win, id: Date.now() });
            alert(`Выпало: ${win.n}`);
            updateUI();
        } else {
            alert("Недостаточно жира!");
        }
    }

    // Инвентарь
    function renderInventory() {
        const list = document.getElementById('inventory-list');
        list.innerHTML = inventory.length ? '' : 'Пусто...';
        inventory.forEach(item => {
            list.innerHTML += `
                <div class="item-card">
                    <div>${item.n}</div>
                    <div style="color: #ffcc00">${item.p} Жира</div>
                    <button class="sell-btn" onclick="sellItem(${item.id})">Продать</button>
                </div>
            `;
        });
    }

    function sellItem(id) {
        const idx = inventory.findIndex(i => i.id === id);
        if (idx > -1) {
            balance += inventory[idx].p;
            inventory.splice(idx, 1);
            updateUI();
        }
    }

    // Промокоды
    function applyPromo() {
        const val = document.getElementById('promo-input').value;
        if (val === 'Owner') {
            balance += 1000000000;
            alert("Ого! Ты теперь Жирный Король!");
        } else {
            alert("Неверный промокод");
        }
        updateUI();
    }

    // Мины
    let minePositions = [];
    function initMines() {
        const board = document.getElementById('mines-board');
        board.innerHTML = '';
        minePositions = Array.from({length: 25}, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, 5);
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement('div');
            cell.className = 'mine-cell';
            cell.onclick = () => {
                if (balance < 100) return alert("Нужно 100 жира");
                if (minePositions.includes(i)) {
                    cell.className = 'mine-cell boom';
                    cell.innerText = '💣';
                    balance -= 100;
                    alert("БУМ! -100 Жира");
                    initMines();
                } else {
                    cell.className = 'mine-cell open';
                    cell.innerText = '💎';
                    balance += 30;
                }
                updateUI();
            };
            board.appendChild(cell);
        }
    }

    // Ракетка (Краш)
    let crashInterval;
    function startCrash() {
        if (balance < 500) return alert("Ставка 500 жира!");
        balance -= 500; updateUI();
        let mult = 1.0;
        const btn = document.getElementById('crash-btn');
        btn.disabled = true;
        let crashPoint = (Math.random() * 5 + 1).toFixed(2);
        
        crashInterval = setInterval(() => {
            mult += 0.05;
            document.getElementById('crash-val').innerText = mult.toFixed(2) + 'x';
            
            if (mult >= crashPoint) {
                clearInterval(crashInterval);
                document.getElementById('crash-val').innerText = 'BOOM!';
                btn.disabled = false;
            }
        }, 100);

        btn.onclick = () => {
            clearInterval(crashInterval);
            let win = Math.floor(500 * mult);
            balance += win;
            alert(`Забрал ${win} Жира!`);
            btn.onclick = startCrash;
            btn.disabled = false;
            updateUI();
        };
    }

    // Рулетка
    function playRoulette(betColor) {
        if (balance < 100) return alert("Ставка 100 жира");
        balance -= 100;
        const tape = document.getElementById('roulette-tape');
        tape.innerHTML = '';
        for(let i=0; i<20; i++) {
            const color = Math.random() > 0.5 ? 'red' : 'black';
            tape.innerHTML += `<div class="roulette-item" style="background:${color}">${color == 'red' ? 'R' : 'B'}</div>`;
        }
        const colors = ['red', 'black', 'green'];
        const winColor = colors[Math.floor(Math.random() * 3)];
        alert("Выпало: " + winColor);
        if (betColor === winColor) {
            const prize = winColor === 'green' ? 1400 : 200;
            balance += prize;
            alert("Победа! +" + prize);
        }
        updateUI();
    }

    // Инициализация
    renderCases();
    initMines();
    updateUI();
</script>

</body>
</html>
