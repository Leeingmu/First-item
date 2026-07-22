const drawButton = document.getElementById('drawButton');
const lottoBalls = document.getElementById('lottoBalls');

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

function renderLottoNumbers(numbers) {
  lottoBalls.innerHTML = '';

  numbers.forEach((number) => {
    const ball = document.createElement('span');
    ball.className = 'ball';
    ball.textContent = number;
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
