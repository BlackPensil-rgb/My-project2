export interface Gift {
  id: number;
  name: string;
  emoji: string;
  chance: number; // Вес для рандома
  price: number;  // Стоимость в ЖИРЕ
}

// Список стандартных эмодзи для заполнения
const tgEmojis = ["🧸", "🍷", "💍", "🌹", "💎", "🎁", "👑", "🦁", "🚗", "🏠", "🛥️", "🚀", "🏝️", "🍾", "🎸", "⌚", "🏆", "🎰", "💰", "🧿"];

const generateGifts = (): Gift[] => {
  const gifts: Gift[] = [];

  for (let i = 1; i <= 101; i++) {
    let name = `Подарок TG #${i}`;
    let emoji = tgEmojis[i % tgEmojis.length];
    let chance = Math.max(100 - i, 5); // Шанс падает с 99% до 5%
    let price = i * 500; // Цена растет

    // --- РУЧНАЯ ПРОПИСКА КЛЮЧЕВЫХ УРОВНЕЙ ---
    if (i === 1) { name = "Мишка"; emoji = "🧸"; chance = 98; price = 100; }
    if (i === 2) { name = "Вино"; emoji = "🍷"; chance = 95; price = 250; }
    if (i === 3) { name = "Кольцо"; emoji = "💍"; chance = 90; price = 500; }
    if (i === 4) { name = "Роза"; emoji = "🌹"; chance = 85; price = 750; }
    if (i === 10) { name = "Алмаз"; emoji = "💎"; chance = 70; price = 2000; }
    if (i === 25) { name = "Золотой Слиток"; emoji = "🧱"; chance = 50; price = 10000; }
    if (i === 50) { name = "Машина"; emoji = "🚗"; chance = 35; price = 50000; }
    if (i === 75) { name = "Яхта"; emoji = "🛥️"; chance = 20; price = 150000; }
    if (i === 100) { name = "Ракета"; emoji = "🚀"; chance = 10; price = 500000; }
    
    // --- ФИНАЛЬНЫЙ БОСС ---
    if (i === 101) {
      name = "🔥 DEPARTMENT";
      emoji = "🏛️";
      chance = 3;
      price = 1000000000;
    }

    gifts.push({ id: i, name, emoji, chance, price });
  }
  return gifts;
};

export const ALL_GIFTS = generateGifts();
