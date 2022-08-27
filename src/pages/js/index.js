async function switchState(target, id) {
  try {
    const response = await axios.post('/api/command', { id, command: 'on'});

    if(!response.data) return;

    target.classList.toggle('active');
  } catch (error) {
    console.error(error);
  }
}

// async function switchStateForGroup(group) {
//   group.foreach((id) => {
//     const el = 
//   })
// }