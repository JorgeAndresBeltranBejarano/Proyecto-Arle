// roles.js
// Aplica visibilidad de botones según rol guardado en localStorage
document.addEventListener("DOMContentLoaded", () => {
  const rol = localStorage.getItem("usuarioRol"); // "admin" | "usuario" | null

  // Si no hay sesión, redirigir al login (excepto si ya estás en login)
  if (!rol && !location.pathname.endsWith("index.html") && !location.pathname.endsWith("login.html")) {
    window.location.href = "index.html"; // tu login page
    return;
  }

  // Función que oculta/mostrar elementos según clase
  function toggleByClass(cls, show) {
    document.querySelectorAll(cls).forEach(el => {
      el.style.display = show ? "" : "none";
    });
  }

  // Reglas:
  // - Ambos roles pueden ver "Agregar" cuando están en eventos.html
  // - Solo admin verá botones .btn-editar y .btn-eliminar en historialEventos.html (es ahí donde se renderizan)
  if (rol === "admin") {
    // admin: todo visible (cuando exista)
    toggleByClass(".btn-agregar", true);
    toggleByClass(".btn-editar", true);
    toggleByClass(".btn-eliminar", true);
  } else if (rol === "usuario") {
    // usuario normal: puede agregar, NO editar ni eliminar
    toggleByClass(".btn-agregar", true);
    toggleByClass(".btn-editar", false);
    toggleByClass(".btn-eliminar", false);
  } else {
    // sin sesión: ocultar todo sensible
    toggleByClass(".btn-agregar", false);
    toggleByClass(".btn-editar", false);
    toggleByClass(".btn-eliminar", false);
  }
});
