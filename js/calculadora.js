function calcular() {
      const kw   = parseFloat(document.getElementById('potencia').value);
      const hrs  = parseFloat(document.getElementById('horas').value);
      const dias = parseFloat(document.getElementById('dias').value);

      const resDiv    = document.getElementById('resultado-calc');
      const resTexto  = document.getElementById('res-texto');
      const resBadge  = document.getElementById('res-badge');
      const resIcono  = document.getElementById('res-icono');

      if (isNaN(kw) || isNaN(hrs) || isNaN(dias) || kw <= 0 || hrs <= 0 || dias <= 0) {
        resTexto.textContent = 'Por favor ingresa valores positivos en todos los campos.';
        resBadge.textContent = '⚠️ Valores inválidos';
        resBadge.style.background = '#fdf0e0';
        resBadge.style.color = '#7a3010';
        resIcono.textContent = '⚠️';
        resDiv.classList.add('visible');
        return;
      }

      const kwh = kw * hrs * dias;

      resIcono.textContent = '☀️';
      resTexto.innerHTML =
        `Con <strong>${kw} kW</strong> instalados, ` +
        `<strong>${hrs} h/día</strong> de sol y ` +
        `<strong>${dias} días</strong>:<br>` +
        `<span style="font-size:1.5rem; font-family:'Playfair Display',serif; color:var(--cafe-oscuro);">` +
        `${kwh.toFixed(2)} kWh producidos</span>`;

      // Condición if/else para clasificar el resultado
      if (kwh < 100) {
        resBadge.textContent = '🔋 Producción baja';
        resBadge.style.background = '#fcecd8';
        resBadge.style.color = '#7a4010';
      } else if (kwh < 500) {
        resBadge.textContent = '⚡ Producción moderada';
        resBadge.style.background = '#fff8dc';
        resBadge.style.color = '#6b5010';
      } else if (kwh < 1500) {
        resBadge.textContent = '🌱 Producción suficiente para un hogar';
        resBadge.style.background = '#edf5e1';
        resBadge.style.color = '#3a5020';
      } else {
        resBadge.textContent = '🚀 Alta producción — posible excedente';
        resBadge.style.background = '#e1f0f5';
        resBadge.style.color = '#10405a';
      }

      resDiv.classList.add('visible');
    }