// login.js
// Control sencillo de login: guarda el rol en localStorage como "usuarioRol"
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const usuarios = [
      { email: "admin@arle.com", password: "admin123", rol: "admin" },
      { email: "usuario@arle.com", password: "usuario123", rol: "usuario" }
    ];

    const u = usuarios.find(x => x.email === email && x.password === password);
    if (!u) {
      alert("Correo o contraseña incorrectos");
      return;
    }

    localStorage.setItem("usuarioRol", u.rol);
    // Redirige al listado o a crear según prefieras; dejo eventos.html
    window.location.href = "eventos.html";
  });
});
