const drawButton = document.getElementById('drawButton');
const lottoBalls = document.getElementById('lottoBalls');
const themeToggle = document.getElementById('themeToggle');

// --- Theme Management ---
function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

setTheme(getInitialTheme());
themeToggle.addEventListener('click', toggleTheme);

// --- Lotto Number Logic ---
function getRandomLottoNumbers() {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1);
  const result = [];

  while (result.length < 6) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const [chosen] = numbers.splice(randomIndex, 1);
    result.push(chosen);
  }

  return result.sort((a, b) => a - b);
}

function getBallBackground(num) {
  if (num <= 10) {
    return 'radial-gradient(circle at 30% 30%, #fef08a, #eab308 70%, #ca8a04)';
  } else if (num <= 20) {
    return 'radial-gradient(circle at 30% 30%, #93c5fd, #3b82f6 70%, #1d4ed8)';
  } else if (num <= 30) {
    return 'radial-gradient(circle at 30% 30%, #fca5a5, #ef4444 70%, #b91c1c)';
  } else if (num <= 40) {
    return 'radial-gradient(circle at 30% 30%, #cbd5e1, #64748b 70%, #334155)';
  } else {
    return 'radial-gradient(circle at 30% 30%, #86efac, #22c55e 70%, #15803d)';
  }
}

function renderLottoNumbers(numbers) {
  lottoBalls.innerHTML = '';

  numbers.forEach((number, idx) => {
    const ball = document.createElement('span');
    ball.className = 'ball';
    ball.textContent = number;
    ball.style.background = getBallBackground(number);
    ball.style.animationDelay = `${idx * 0.05}s`;
    lottoBalls.appendChild(ball);
  });
}

function drawLotto() {
  const numbers = getRandomLottoNumbers();
  renderLottoNumbers(numbers);
}

drawButton.addEventListener('click', drawLotto);

// 최초 방문 시 기본 번호 생성
drawLotto();

