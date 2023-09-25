window.addEventListener("load", function () {
    // Selecciono el formulario //
    let formularioRegistro = document.querySelector("form.campo-negro");

    formularioRegistro.addEventListener("submit", function (e) {
        e.preventDefault();

        // Selecciono los campos del formulario //
        let campoImagen = document.getElementById("imagen");
        let campoEmail = document.getElementById("email");
        let campoContrasena = document.getElementById("password");
        let campoNombre = document.getElementById("nombreUsuario");

        // Errores //
        let errorImagen = document.getElementById("errorImagen");
        let errorEmail = document.getElementById("errorEmail");
        let errorContrasena = document.getElementById("errorContrasena");
        let errorNombre = document.getElementById("errorNombre");

        let c = 0;

        // Limpiar errores previos //
        errorImagen.innerText = "";
        errorEmail.innerText = "";
        errorContrasena.innerText = "";
        errorNombre.innerText = "";

        if (!(campoImagen.value)) {
            errorImagen.innerText = "Debes cargar una imagen para continuar";
            errorImagen.style.color = "red";
            c = 1;
        }

        if (!(campoEmail.value)) {
            errorEmail.innerText = "Completa un correo electrónico para continuar";
            errorEmail.style.color = "red";
            c = 1;
        }

        if (!(campoContrasena.value)) {
            errorContrasena.innerText = "Ingresa una contraseña para continuar";
            errorContrasena.style.color = "red";
            c = 1;
        }
        //minimamente tenga 6 caracteres la contraseña//
        else if (campoContrasena.value.length < 6) {
            errorContrasena.innerText = "La contraseña debe tener al menos 6 caracteres";
            errorContrasena.style.color = "red";
            c = 1;
        }

        // Verificación de disponibilidad de nombre de usuario//
        const nombreUsuario = campoNombre.value;
        //El nombre de usuario existe si tiene al menos 3 caracteres//
        const nombreUsuarioExiste = nombreUsuario && nombreUsuario.length >= 3;


        if (!nombreUsuario) {
            errorNombre.innerText = "Completa tu nombre de usuario para continuar";
            errorNombre.style.color = "red";
            c = 1;
        }
        
        /*else if (nombreUsuarioExiste) {
            errorNombre.innerText = "El nombre de usuario ya está en uso. Por favor, elige otro.";
            errorNombre.style.color = "red";
            c = 1;
        }*/

        console.log(nombreUsuarioExiste);
        
        if (c == 1) { return; }

        // Muestra un mensaje de agradecimiento usando SweetAlert2
        Swal.fire({
            title: '¡Gracias por registrarte!',
            confirmButtonText: 'Aceptar',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });

        formularioRegistro.submit();
    });
});


