window.addEventListener("load", function () {

    let formularioLogueo = document.querySelector("form.campo-negro");

    formularioLogueo.addEventListener("submit", function (e) {
        e.preventDefault();

        // Selecciono los campos del formulario //
        let campoEmail = document.getElementById("email");
        let campoContrasena = document.getElementById("password");


        // Errores //
        let error1 = document.getElementById("error1");
        let error2 = document.getElementById("error2");

        let c = 0;

        // Limpiar errores previos //
        error1.innerText = "";
        error2.innerText = "";

        if (!(campoEmail.value)) {
            error1.innerText = "Completa un correo electrónico para continuar";
            error1.style.color = "red";
            c = 1;
        }

        if (!(campoContrasena.value)) {
            error2.innerText = "Ingresa una contraseña para continuar";
            error2.style.color = "red";
            c = 1;
        }

        if (c == 1) { return; }

        // Si no hay errores, formulario enviado con éxito//
        alert("¡Nuevamente en tu perfil!");
        formularioLogueo.submit();
    });

})



