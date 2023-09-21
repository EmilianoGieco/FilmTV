let ff = document.getElementById("CrearFilm");

ff.addEventListener("submit", function(event) {
    if (!ff.checkValidity()) {
        // El formulario no es válido, no mostrar la alerta
        return;
    }

    alert("Su artículo fue creado correctamente");
});