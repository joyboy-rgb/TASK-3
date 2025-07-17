const socket = io();
const editor = document.getElementById('editor');
let typing = false;

socket.on('loadContent', (data) => {
  editor.value = data;
});

socket.on('receiveContent', (data) => {
  if (!typing) {
    editor.value = data;
  }
});

editor.addEventListener('input', () => {
  typing = true;
  socket.emit('updateContent', editor.value);
  setTimeout(() => typing = false, 300);
});
