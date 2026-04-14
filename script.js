const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    });
}

const heroSlides = [
    {
        title: 'IA, Nuvem e Big Data no seu futuro',
        text: 'Formamos profissionais para computação em nuvem, inteligência artificial e sistemas hiperconectados – as tecnologias que impulsionam o mercado atual.'
    },
    {
        title: 'Desenvolvimento Full-Stack',
        text: 'De algoritmos a apps móveis: programação web, mobile e engenharia de software para soluções completas.'
    },
    {
        title: 'Segurança e Auditoria',
        text: 'Proteja sistemas contra ameaças modernas com conhecimentos em criptografia e compliance.'
    },
    {
        title: 'Ciência de Dados',
        text: 'Análise de dados massivos para decisões estratégicas em agro, comércio e serviços.'
    },
    {
        title: 'Sistemas Distribuídos',
        text: 'Escalabilidade com nuvem e IoT para aplicações hiperconectadas.'
    },
    {
        title: 'Gestão de Projetos TI',
        text: 'Empreendedorismo e liderança em tech para inovar no sul de MG.'
    }
];

const heroTitle = document.getElementById('heroTitle');
const heroText = document.getElementById('heroText');
const heroCounter = document.getElementById('heroCounter');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');

let currentSlide = 0;
let slideInterval;

function updateHeroSlide(index) {
    if (!heroTitle || !heroText || !heroCounter) return;
    const slide = heroSlides[index];
    heroTitle.textContent = slide.title;
    heroText.textContent = slide.text;
    heroCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
}

function nextHeroSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    updateHeroSlide(currentSlide);
}

function prevHeroSlide() {
    currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
    updateHeroSlide(currentSlide);
}

function startSlideRotation() {
    slideInterval = setInterval(nextHeroSlide, 5000);
}

function restartSlideRotation() {
    clearInterval(slideInterval);
    startSlideRotation();
}

if (prevSlide && nextSlide) {
    prevSlide.addEventListener('click', () => {
        prevHeroSlide();
        restartSlideRotation();
    });
    nextSlide.addEventListener('click', () => {
        nextHeroSlide();
        restartSlideRotation();
    });
}

updateHeroSlide(currentSlide);
startSlideRotation();

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

function setActiveNavLink() {
    const scrollY = window.scrollY + 140;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);