
function corousel(){
    const carousel = document.querySelector('.carousel');
    const arrowBtns = document.querySelectorAll('.flecha');
    const firstCardWidth = carousel.querySelector('.card').offsetWidth + 50;

    let isDragging = false, startX, startScrollLeft;

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        })
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);   
    }

    const dragStop = (e) => {
        isDragging = false;
        carousel.classList.remove("dragging");  
    }

    const infiniteScroll = () => {
        if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }
    }

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
}

// Función para mostrar u ocultar el botón flotante dependiendo del tamaño de la pantalla
function toggleBtnFlotante() {
    var btnFlotante = document.querySelector('.btn-flotante');
    
    if (window.innerWidth <= 768) { // Cambiar el valor según el tamaño deseado
        btnFlotante.classList.add('mostrar');
    } else {
        btnFlotante.classList.remove('mostrar');
    }
}

// Llamar a la función al cargar la página y al cambiar el tamaño de la ventana
window.onload = toggleBtnFlotante;
window.onresize = toggleBtnFlotante;
window.onload = corousel;