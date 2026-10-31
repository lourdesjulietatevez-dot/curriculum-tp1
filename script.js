
// Interacciones sencillas de la maqueta, sin dependencias externas.

// Menú de navegación mobile
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-enlaces');

if (menu && links) {
    menu.addEventListener('click', () => {
        const open = links.classList.toggle('open');

        menu.classList.toggle('open', open);
        menu.setAttribute('aria-expanded', String(open));
        menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
}

// Desplegables de proyectos
for (const btn of document.querySelectorAll('.project-toggle')) {
    btn.addEventListener('click', () => {
        const detail = document.getElementById(btn.getAttribute('aria-controls'));
        const open = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', String(!open));
        btn.textContent = open ? '+' : '−';
        detail.hidden = open;
    });
}

// Carrusel de áreas de trabajo
const areas = [...document.querySelectorAll('.area')];
let areaIndex = 0;
const areaLabel = document.querySelector('.areas-indicator');

function showArea() {
    areas.forEach((el, i) => {
        el.classList.toggle('active', i === areaIndex);
    });

    if (areaLabel) {
        areaLabel.textContent = `0${areaIndex + 1} / 03 — ${[
            'Identidad visual',
            'Packaging',
            'Diseño digital'
        ][areaIndex]}`;
    }
}

if (areas.length) {
    showArea();

    document.querySelector('.areas-prev')?.addEventListener('click', () => {
        areaIndex = (areaIndex + areas.length - 1) % areas.length;
        showArea();
    });

    document.querySelector('.areas-next')?.addEventListener('click', () => {
        areaIndex = (areaIndex + 1) % areas.length;
        showArea();
    });
}

// Carrusel de videos
const videos = [...document.querySelectorAll('.video-slide')];
let videoIndex = 0;
const vidLabel = document.querySelector('.video-indicator');

function showVideo() {
    videos.forEach((el, i) => {
        el.hidden = i !== videoIndex;

        if (i !== videoIndex) {
            el.querySelector('video')?.pause();
        }
    });

    if (vidLabel) {
        vidLabel.textContent = `0${videoIndex + 1} / 03 — ${[
            'Inicio',
            'Descubrí',
            'Planificá tu visita'
        ][videoIndex]}`;
    }
}

if (videos.length) {
    showVideo();

    document.querySelector('.video-prev')?.addEventListener('click', () => {
        videoIndex = (videoIndex + 2) % 3;
        showVideo();
    });

    document.querySelector('.video-next')?.addEventListener('click', () => {
        videoIndex = (videoIndex + 1) % 3;
        showVideo();
    });
}

// Formulario de contacto
const form = document.querySelector('#contact-form');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const name = form.querySelector('[name=nombre]').value.trim();
        const email = form.querySelector('[name=email]').value.trim();
        const message = form.querySelector('[name=mensaje]').value.trim();

        const subj = encodeURIComponent('Consulta desde el portfolio');

        const body = encodeURIComponent(`Nombre: ${name}
Correo: ${email}

${message}`);

        form.querySelector('.form-feedback').textContent =
            'Se abrirá tu aplicación de correo para enviar el mensaje.';

        window.location.href = `mailto:?subject=${subj}&body=${body}`;
    });
}
