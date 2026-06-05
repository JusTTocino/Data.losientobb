document.getElementById('miFormulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const alerta  = document.getElementById('alerta');

  alerta.className = 'alerta';

  if (nombre === '' || email === '' || mensaje === '') {
    alerta.textContent = ' Por favor completa todos los campos.';
    alerta.classList.add('error', 'visible');
    alerta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return; 
  } 
  
  if (!email.includes('@')) {
    alerta.textContent = ' El correo electrónico no es válido.';
    alerta.classList.add('error', 'visible');
    alerta.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return; 
  }
  alerta.textContent = ' Enviando tu mensaje de manera segura...';
  alerta.classList.add('exito', 'visible');
  const datosFormulario = new FormData();
  datosFormulario.append('nombre', nombre);
  datosFormulario.append('email', email);
  datosFormulario.append('mensaje', mensaje);
  datosFormulario.append('_subject', 'Nuevo mensaje desde TecnoFuturo');
  datosFormulario.append('_captcha', 'false'); /
  fetch("https://formsubmit.co/ajax/data.losientobb@gmail.com", {
    method: "POST",
    body: datosFormulario,
    headers: {
        'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor externo');
    }
    return response.json();
  })
  .then(data => {
    alerta.textContent = ' ¡Mensaje enviado correctamente! Gracias, ' + nombre + '.';
    alerta.className = 'alerta exito visible';
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
  })
  .catch(error => {
    alerta.textContent = ' Hubo un problema al procesar el envío. Revisa tu conexión.';
    alerta.className = 'alerta error visible';
    console.error('Error reportado:', error);
  });
});
