var socket = io();

var params = new URLSearchParams(window.location.search);

if(!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesario')
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}


socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('EntrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    })
})

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// // Enviar información
// socket.emit('crearMensaje', {
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    // console.log('Servidor:', mensaje);
    renderizarMensajes(mensaje, false)
    scrollBottom()

});

socket.on('listaPersona', function(personas) {

    renderizarUsuarios(personas);

});

//mensajes privados
socket.on('mensajePrivado', function(mensaje) {

  console.log('mensaje Privado: ', mensaje);

})