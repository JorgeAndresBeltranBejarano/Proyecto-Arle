// funcionalidad.js
// Maneja solo la creación/registro de eventos (guardar en localStorage)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnGuardar");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const rol = localStorage.getItem("usuarioRol");
    if (!rol) {
      alert("Debes iniciar sesión para crear eventos.");
      return;
    }

    // Capturar datos (asegúrate que los ids coincidan con eventos.html)
    const evento = {
      titulo: document.getElementById("titulo").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      tipo: document.getElementById("tipo").value.trim(),
      fecha: document.getElementById("fecha").value.trim(),
      pais: document.getElementById("pais").value.trim(),
      ciudad: document.getElementById("ciudad").value.trim(),
      lugar: document.getElementById("lugar").value.trim()
    };

    // Validación básica
    if (!evento.titulo) {
      alert("El título es obligatorio.");
      return;
    }

    // Leer, agregar y guardar
    const lista = JSON.parse(localStorage.getItem("eventos")) || [];
    lista.push(evento);
    localStorage.setItem("eventos", JSON.stringify(lista));

    alert("Evento registrado con éxito.");

    // Limpiar inputs
    document.querySelectorAll("input").forEach(i => i.value = "");
  });
});
