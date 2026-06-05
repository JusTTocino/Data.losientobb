document.getElementById('miFormulario').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que la página se mueva

  const nombre  = document.getElementById('nombre').value.trim();
  const email   = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const alerta  = document.getElementById('alerta');

  alerta.className = 'alerta';

  if (nombre === '' || email === '' || mensaje === '') {
    alerta.textContent = '⚠️ Por favor completa todos los campos.';
    alerta.className = 'alerta error visible';
    return;
  } 
  
  if (!email.includes('@')) {
    alerta.textContent = '⚠️ El correo electrónico no es válido.';
    alerta.className = 'alerta error visible';
    return;
  }

  alerta.textContent = '⏳ Enviando tu mensaje...';
  alerta.className = 'alerta exito visible';

  // CAMBIO AQUÍ: Usamos las llaves exactas en inglés (name, email, message) para que FormSubmit las entienda al 100%
  const datosObjeto = {
    name: nombre,
    email: email,
    message: mensaje,
    _subject: 'Nuevo mensaje desde TecnoFuturo'
  };

  // ⚠️ ASEGÚRATE DE PONER TU CORREO REAL AQUÍ ABAJO ⚠️
  fetch("https://formsubmit.co/ajax/meneses.alejandro.cb37@gmail.com", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify(datosObjeto)
  })
  .then(response => {
    if (!response.ok) throw new Error('Error en el servidor');
    return response.json();
  })
  .then(data => {
    // Texto de éxito en tu propia pantalla
    alerta.textContent = '✅ Tu correo fue enviado correctamente.';
    alerta.className = 'alerta exito visible';
    
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
  })
  .catch(error => {
    alerta.textContent = '⚠️ Hubo un problema al procesar el envío. Revisa tu conexión.';
    alerta.className = 'alerta error visible';
    console.error('Error:', error);
  });
});
