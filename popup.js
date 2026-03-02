const input = document.getElementById('apiKey');
const btn = document.getElementById('saveBtn');
const msg = document.getElementById('msg');
const dot = document.getElementById('dot');

// 1. Al abrir el popup, cargar la clave si ya existe
chrome.storage.sync.get('wakaKey', (data) => {
  if (data.wakaKey) {
    input.value = data.wakaKey;
    dot.classList.add('status-active');
    msg.textContent = "Connected to WakaTime";
  }
});

// 2. Guardar la clave al hacer clic
btn.addEventListener('click', () => {
  const newKey = input.value.trim();
  
  if (newKey) {
    chrome.storage.sync.set({ wakaKey: newKey }, () => {
      dot.classList.add('status-active');
      msg.textContent = "Successfully saved!";
      setTimeout(() => { msg.textContent = "Connected to WakaTime"; }, 2000);
    });
  } else {
    msg.style.color = "red";
    msg.textContent = "Please enter an API key";
  }
});