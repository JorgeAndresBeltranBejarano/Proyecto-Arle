document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btnGuardar");

    btn.addEventListener("click", () => {
        // Capturar datos
        const evento = {
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            tipo: document.getElementById("tipo").value,
            fecha: document.getElementById("fecha").value,
            pais: document.getElementById("país").value,
            ciudad: document.getElementById("ciudad").value,
            lugar: document.getElementById("lugar").value
        };

        // Leer eventos existentes en localStorage
        let lista = JSON.parse(localStorage.getItem("eventos")) || [];

        // Agregar nuevo evento
        lista.push(evento);

        // Guardar otra vez
        localStorage.setItem("eventos", JSON.stringify(lista));

        alert("Evento registrado con éxito");

        // Opcional: limpiar campos
        document.querySelectorAll("input").forEach(input => input.value = "");
    });
});
