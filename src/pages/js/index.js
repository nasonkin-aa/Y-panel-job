async function switchStatus(target, id) {
  try {
    const isActive = target.dataset.status === "on";
    const response = await axios.post('/api/command', { id, command: isActive ? 'off' : 'on'});

    if(!response.data.success) return;

    target.classList.toggle('active');
    target.dataset.status = isActive ? 'off' : 'on';

    if (isActive) {
      target.innerHTML = 'Включить';
    } else {
      target.innerHTML = 'Выключить'
    }
  } catch (error) {
    console.error(error);
  }
}

async function switchStatusForGroup(group, status) {
  group.forEach(async (id) => {
    const el = document.getElementById(`btn_id_${id}`);
    const response = await axios.post('/api/command', { id, command: status});

    if(!response.data.success) return;

    if (status === 'on') el.classList.add('active');
    else el.classList.remove('active');

    el.dataset.status = status;

    if (status === 'on') {
      el.innerHTML = 'Выключить';
    } else {
      el.innerHTML = 'Включить'
    }
  })
}

function switchStatusForAll(status) {
  const group = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  switchStatusForGroup(group, status);
}

async function getHumidity() {
  const elements = document.querySelectorAll('[data-humidity_id]');

  elements.forEach(async (el) => {
    const id = el.dataset.humidity_id;
    const response = await axios.post('/api/command', { id, command: 'getHumidity' });

    if(!response.data.success) return;

    el.innerHTML = 'Влажность: ' + response.data.payload;
  });
}

window.onload = () => {
  setInterval(() => {
    getHumidity();
  }, 15000);

  getHumidity();
}