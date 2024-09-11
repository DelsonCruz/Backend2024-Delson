const socket = io()

const chatBox = document.getElementById('chatBox')
const messageLogs = document.getElementById('messageLogs')
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

let user

Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Por favor ingrese su nombre de usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

chatBox.addEventListener('change', (e) => {

    if (chatBox.value.trim().length > 0) {
        socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
        chatBox.value = ""
    }

})

socket.on('mensajeLogs', info => {
    messageLogs.innerHTML = ""
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})



form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('chat message', input.value);
                input.value = '';
            }
        });

socket.on('chat message', function(msg) {
            const li = document.createElement('li');
            li.textContent = msg;
            messages.appendChild(li);
            window.scrollTo(0, document.body.scrollHeight);
        });