// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail')

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();

function eventListener () {
    // Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);

    // Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
}

// Funciones

function iniciarApp(){
    btnEnviar.disabled = true
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50')
}

// Valida el formulario 
function validarFormulario (e){
    if(e.target.value.length > 0) {

        // Elimina cartel error...
        const error= document.querySelector('p.error');
            if(error){
                error.remove();
            }

        // Esto hace que se elimine la clase y viceversa
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
       
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email'){
        // Expresion regular
        
            //  const resultado = e.target.value.indexOf('@'); // Busca al menos 1 @ - Forma basica (no usamos)
        if (er.test( e.target.value )){
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            // Esto hace que se elimine la clase y viceversa
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
        } else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email no válido');
        }}

    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){ // Esto hace que cuando se complete todo, el boton permita enviar mensaje
        btnEnviar.disabled = false 
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    }
   
}

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError)};
}

// Enviar el email 
function enviarEmail(e){
    e.preventDefault();
    
    // Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.getElementsByClassName.display = 'flex'; // Muestra luego de enviar, el spinner


    // Despues de 3seg, ocultar spinner y mostrar mensaje
    setTimeout(() => { // Esta se ejecuta 1 vez, setInterval va ejecutar cada X tiempo ya dicho
        spinner.style.display = 'none'
        
        //Mensaje que dice se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envió correctamente.'
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')

        // Inserta el parrafo antes del spinner
        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove(); // Elimina al terminar

            resetearFormulario();
        }, 5000)
    }, 2000);

}

// Funcion que resetea el formulario

function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}