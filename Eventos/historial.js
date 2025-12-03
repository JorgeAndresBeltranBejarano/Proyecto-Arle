// historial.js
// Renderiza eventos desde localStorage y añade botones Editar/Eliminar por evento.
// Solo admin podrá usar las funciones de editar/eliminar: se comprueba el rol antes de ejecutar.

document.addEventListener("DOMContentLoaded", () => {
  const cont = document.getElementById("listaEventos");
  if (!cont) return;

  function obtenerEventos() {
    return JSON.parse(localStorage.getItem("eventos")) || [];
  }

  function guardarEventos(evs) {
    localStorage.setItem("eventos", JSON.stringify(evs));
  }

  function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function render() {
    const eventos = obtenerEventos();
    cont.innerHTML = "";

    if (eventos.length === 0) {
      cont.innerHTML = "<p style='text-align:center; font-size:20px;'>No hay eventos registrados</p>";
      return;
    }

    eventos.forEach((e, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${escapeHtml(e.titulo)}</h2>
        <p><strong>Descripción:</strong> ${escapeHtml(e.descripcion)}</p>
        <p><strong>Tipo:</strong> ${escapeHtml(e.tipo)}</p>
        <p><strong>Fecha y hora:</strong> ${escapeHtml(e.fecha)}</p>
        <p><strong>País:</strong> ${escapeHtml(e.pais)}</p>
        <p><strong>Ciudad:</strong> ${escapeHtml(e.ciudad)}</p>
        <p><strong>Lugar:</strong> ${escapeHtml(e.lugar)}</p>
        <div class="actions" style="margin-top:8px;">
          <button class="btn-editar" data-index="${i}">Editar</button>
          <button class="btn-eliminar" data-index="${i}">Eliminar</button>
        </div>
      `;
      cont.appendChild(card);
    });

    // Después de crear las tarjetas, enlazar botones
    document.querySelectorAll(".btn-editar").forEach(b => b.addEventListener("click", onEditar));
    document.querySelectorAll(".btn-eliminar").forEach(b => b.addEventListener("click", onEliminar));
  }

  // Verifica rol (usa localStorage directo; roles.js controla visibilidad)
  function rolActual() {
    return localStorage.getItem("usuarioRol");
  }

  function onEditar(ev) {
    const idx = parseInt(ev.currentTarget.dataset.index, 10);
    const rol = rolActual();
    if (rol !== "admin") {
      alert("Solo el administrador puede editar eventos.");
      return;
    }

    const eventos = obtenerEventos();
    const item = eventos[idx];
    if (!item) { alert("Evento no encontrado"); return; }

    // Editamos con prompts simples (rápido). Puedes cambiar por formulario si quieres.
    const nuevoTitulo = prompt("Título:", item.titulo) || item.titulo;
    const nuevaDescripcion = prompt("Descripción:", item.descripcion) || item.descripcion;
    const nuevoTipo = prompt("Tipo:", item.tipo) || item.tipo;
    const nuevaFecha = prompt("Fecha y hora:", item.fecha) || item.fecha;
    const nuevoPais = prompt("País:", item.pais) || item.pais;
    const nuevaCiudad = prompt("Ciudad:", item.ciudad) || item.ciudad;
    const nuevoLugar = prompt("Lugar:", item.lugar) || item.lugar;

    eventos[idx] = {
      titulo: nuevoTitulo,
      descripcion: nuevaDescripcion,
      tipo: nuevoTipo,
      fecha: nuevaFecha,
      pais: nuevoPais,
      ciudad: nuevaCiudad,
      lugar: nuevoLugar
    };

    guardarEventos(eventos);
    alert("Evento actualizado.");
    render();
  }

  function onEliminar(ev) {
    const idx = parseInt(ev.currentTarget.dataset.index, 10);
    const rol = rolActual();
    if (rol !== "admin") {
      alert("Solo el administrador puede eliminar eventos.");
      return;
    }

    if (!confirm("¿Deseas eliminar este evento?")) return;

    const eventos = obtenerEventos();
    eventos.splice(idx, 1);
    guardarEventos(eventos);
    alert("Evento eliminado.");
    render();
  }

  render();
});
