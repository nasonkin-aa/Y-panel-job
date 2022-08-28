async function switchStatus(target, id) {
  try {
    const isActive = target.dataset.status === "on";
    const response = await axios.post('/api/command', { id, command: isActive ? 'off' : 'on'});

    if(!response.data) return;

    target.classList.toggle('active');
    target.dataset.status = isActive ? 'off' : 'on';
  } catch (error) {
    console.error(error);
  }
}

async function switchStatusForGroup(group, status) {
  group.forEach(async (id) => {
    const el = document.getElementById(`btn_id_${id}`);
    const response = await axios.post('/api/command', { id, command: status});

    if(!response.data) return;

    if (status === 'on') el.classList.add('active');
    else el.classList.remove('active');

    el.dataset.status = status;
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
    console.log(response);

    if (response) {
      el.innerHTML = 'Влажность: ' + response.data;
    }
  });
}

window.onload = () => {
  setInterval(() => {
    getHumidity();
  }, 15000);

  getHumidity();
}