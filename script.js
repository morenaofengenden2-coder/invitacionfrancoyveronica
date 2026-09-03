document.addEventListener("DOMContentLoaded", function () {
    const sobre = document.getElementById("sobre");
    const musica = document.getElementById("musica");
    const invitacion = document.getElementById("invitacion");

    // 1. ABRIR SOBRE Y DESPLAZAMIENTO SUAVE
    if (sobre) {
        sobre.addEventListener("click", function () {
            sobre.classList.add("abierto");

            if (musica) {
                musica.play().catch(function (error) {
                    console.log("Audio bloqueado por el navegador.");
                });
            }

            setTimeout(function () {
                if (invitacion) {
                    invitacion.scrollIntoView({ behavior: "smooth" });
                }
            }, 800);
        });
    }

    // 2. ACTIVADOR DE ITERACIÓN CONTINUA (Reanima al subir y bajar)
    const diapositivas = document.querySelectorAll(".diapositiva");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                // Se resetea al salir para reanimar cada vez que el usuario sube o baja
                entry.target.classList.remove("visible");
            }
        });
    }, { 
        threshold: 0.1,                  /* Se activa apenas asoma un 10% */
        rootMargin: "50px 0px -20px 0px"   /* Anticipa la animación antes de llegar al centro */
    });

    diapositivas.forEach(diapositiva => {
        observer.observe(diapositiva);
    });

    // 3. CONTADOR DE DÍAS (24 de Octubre de 2026, 12:00 HS)
    const fechaBoda = new Date("October 24, 2026 12:00:00").getTime();

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = fechaBoda - ahora;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            const elDias = document.getElementById("dias");
            const elHoras = document.getElementById("horas");
            const elMinutos = document.getElementById("minutos");
            const elSegundos = document.getElementById("segundos");

            if (elDias) elDias.innerText = dias < 10 ? "0" + dias : dias;
            if (elHoras) elHoras.innerText = horas < 10 ? "0" + horas : horas;
            if (elMinutos) elMinutos.innerText = minutos < 10 ? "0" + minutos : minutos;
            if (elSegundos) elSegundos.innerText = segundos < 10 ? "0" + segundos : segundos;
        }
    }

    actualizarContador();
    setInterval(actualizarContador, 1000);
});