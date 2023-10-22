window.addEventListener("load", function () {

    const form = document.querySelector('.calificacion-form');
    const calif = document.querySelector('input[name="calificacion"]:checked');
    const coment = document.querySelector('#comentarioUsuario');
    const error1 = document.getElementById('error1'); // selecciona el error en el elemento calificacion
    const error2 = document.getElementById('error2'); // selecciona el error en el elemento comentarioUsuario

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let a = 0;

        error1.innerText = "";
        error2.innerText = "";

        const selectedCalificacion = document.querySelector('input[name="calificacion"]:checked');
        if (!selectedCalificacion) {
            error1.innerText = "Por favor, califícanos";
            error1.style.color = "red";
            a = 1;
        }

        if (!(coment.value)) {
            error2.innerText = "por favor, dejanos un comentario";
            error2.style.color = "red";
            a = 1;
        }

        if (a === 1) {
            return;
        }



        
        // Muestra un mensaje de agradecimiento usando SweetAlert2
        Swal.fire({
            title: '¡Gracias por tu voto cinefilo!',
            text: 'Tu opinión es muy valiosa para nosotros.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            showClass: {
                popup: 'animateanimated animatefadeInDown'
            },
            hideClass: {
                popup: 'animateanimated animatefadeOutUp'
            }
        });

        form.submit();

    });

})
