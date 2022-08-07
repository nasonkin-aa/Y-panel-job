import net from 'net';

const app = net.createServer();

app.on('connection', (socket) => {
  console.log(socket.remoteAddress);
  socket.on('data', (data) => {
    console.log(data);
    socket.write('Some payload');
  })
})

app.listen(8001, () => {
  console.log('TCP emulator has started');
});