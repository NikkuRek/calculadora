let BCV = 0;
let BIN = 0;

// --- Fetch Functions ---

async function fetchBCV() {
  try {
    const response = await fetch('https://pydolarve.org/api/v2/dollar?page=bcv');
    const data = await response.json();
    if (data?.monitors?.usd?.price) {
      BCV = parseFloat(data.monitors.usd.price);
      calculateResults();
    }
  } catch (error) {
    console.error('Error fetching BCV USD value:', error);
  }
}

async function fetchBinanceP2PPrice() {
  try {
    const response = await fetch('https://pydolarve.org/api/v2/market-p2p?platform=binance&format_date=default&rounded_price=true');
    const data = await response.json();
    if (data?.price) {
      document.getElementById('labelZ').textContent = data.price;
      BIN = parseFloat(data.price);
    }
  } catch (error) {
    console.error('Error fetching Binance P2P price:', error);
  }
}

// --- Calculation Functions ---

function calculatePercent(bin, bcv) {
  const dif = (bin * 1.06) - bcv;
  return (dif / bcv) + 1;
}

function calculateResults() {
  const input = document.getElementById('inputNumber');
  const X = parseFloat(input.value);

  const labelA = document.getElementById('labelA');
  const labelK = document.getElementById('labelK');
  const labelB = document.getElementById('labelB');
  const labelC = document.getElementById('labelC');

  if (isNaN(X) || input.value.trim() === '') {
    labelA.textContent = '0';
    labelK.textContent = BCV.toString();
    labelB.textContent = '0';
    labelC.textContent = '0';
    return;
  }

  const percent = calculatePercent(BIN, BCV);
  const A = X * percent;
  const B = X * BCV;
  const C = A * BCV;

  labelA.textContent = A.toFixed(2);
  labelK.textContent = BCV.toString();
  labelB.textContent = B.toFixed(2);
  labelC.textContent = C.toFixed(2);
}

// --- Connection Status ---

function checkInternetConnection() {
  const connectionLabel = document.getElementById('connectionStatus');
  if (!navigator.onLine) {
    if (connectionLabel) {
      connectionLabel.textContent = 'Sin conexión a internet';
      connectionLabel.style.display = 'block';
    }
  } else {
    if (connectionLabel) {
      connectionLabel.style.display = 'none';
    }
  }
}

// --- Service Worker Registration ---

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/calculadora/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado con éxito:', registration);
      })
      .catch(error => {
        console.log('Fallo el registro del Service Worker:', error);
      });
  }
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
  fetchBCV();
  fetchBinanceP2PPrice();
  calculateResults();
  checkInternetConnection();
  registerServiceWorker();
});

window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);
