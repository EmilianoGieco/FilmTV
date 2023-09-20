
let ff = document.getElementById("formu");

ff.addEventListener("submit", function(event) {
    if (!ff.checkValidity()) {
        // El formulario no es válido, no mostrar la alerta
        return;
    }

    alert("Su artículo fue actualizado correctamente");
});