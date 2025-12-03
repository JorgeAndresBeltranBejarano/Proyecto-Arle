document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("listaEventos");
    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    if (eventos.length === 0) {
        contenedor.innerHTML = "<p style='text-align:center; font-size:20px;'>No hay eventos registrados</p>";
        return;
    }

    eventos.forEach((e) => {
        let card = `
            <div class="card">
                <h2>${e.titulo}</h2>
                <p><strong>Descripción:</strong> ${e.descripcion}</p>
                <p><strong>Tipo:</strong> ${e.tipo}</p>
                <p><strong>Fecha y hora:</strong> ${e.fecha}</p>
                <p><strong>País:</strong> ${e.pais}</p>
                <p><strong>Ciudad:</strong> ${e.ciudad}</p>
                <p><strong>Lugar:</strong> ${e.lugar}</p>
            </div>
        `;

        contenedor.innerHTML += card;
    });
});
