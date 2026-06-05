
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navUl  = document.querySelector('nav ul');
  if (toggle && navUl) {
    toggle.addEventListener('click', () => {
      navUl.classList.toggle('abierto');
    });
  }


  const links = document.querySelectorAll('nav a');
  const actual = location.pathname.split('/').pop() || 'index.html';
  links.forEach(l => {
    if (l.getAttribute('href') === actual) l.classList.add('activo');
  });


  const anioPie = document.getElementById('anio');
  if (anioPie) anioPie.textContent = new Date().getFullYear();


  const divUbic = document.getElementById('ubicacion');
  if (divUbic) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude.toFixed(4);
          const lon = pos.coords.longitude.toFixed(4);
          divUbic.innerHTML = `📍 Ubicación detectada: Lat ${lat}, Lon ${lon}`;
        },
        () => { divUbic.textContent = '📍 Ubicación no disponible'; }
      );
    } else {
      divUbic.textContent = '📍 Geolocalización no soportada en este navegador';
    }
  }
});


function toggleDetalle(btn) {
  const detalle = btn.previousElementSibling;
  const abierto = detalle.classList.toggle('abierto');
  btn.textContent = abierto ? 'Ver menos ▲' : 'Saber más ▼';
}
