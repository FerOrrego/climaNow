var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var email = document.getElementById("email");
var tipo = document.getElementById("tipo");
var msj = document.getElementById("msj");
var img = document.getElementById("img");
var error = document.getElementById("error");
const correcto = document.getElementById('correcto');

error.style.color = 'red';
correcto.style.color = 'green';

function enviarFormulario(){
    
    var mensajesError = [];

    if(nombre.value === null || nombre.value === ''){
        mensajesError.push('Ingresa tu nombre');
    }
    if(apellido.value === null || apellido.value === ''){
        mensajesError.push('Ingresa tu apellido');
    }
    if(email.value === null || email.value === ''){
        mensajesError.push('Ingresa tu email');
    }
    if(tipo.value == 0){
        mensajesError.push('Selecciona tipo de consulta');
    }
    if(msj.value === null || msj.value === ''){
        mensajesError.push('Ingresa tu mensaje');
    }

    error.innerHTML = mensajesError.join(', ');

    if(mensajesError.length === 0){
        return true;
    }

    return false;
}

var form = document.getElementById("formulario");
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (enviarFormulario()) {
        correcto.innerHTML = '¡Formulario enviado correctamente!';
        form.reset();
    }
});
 