const showMenuBtn = document.querySelector(`#js-triggers li:first-child a`);
const showModalBtn = document.querySelector(`#js-triggers li:last-child a`);
const modalPanel = document.querySelector(`.modal-panel`);
const nav = document.querySelector(`nav`);
document.addEventListener(`click`, (e) => {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnTrigger = showMenuBtn.contains(e.target);

    if (!isClickInsideNav && !isClickOnTrigger) {
        nav.classList.remove(`open`);
    }
});

const toggleMenu = () => {
    const widthThreshold = window.innerWidth < 736;
    nav.classList.toggle(`open`);

    if (!widthThreshold) {
        const submenus = nav.querySelectorAll(`ul > li > ul`);
        submenus.forEach(sub => {
            sub.style.display = sub.style.display === `block` ? `none` : `block`;
        });
    }
};

const openModal = () => {
    modalPanel.classList.add(`active`);
};

const closeModal = () => {
    modalPanel.classList.remove(`active`);
};

showMenuBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    toggleMenu();
});

showModalBtn.addEventListener(`click`, (e) => {
    e.preventDefault();
    openModal();
});

modalPanel.addEventListener(`click`, (e) => {
    if (e.target === modalPanel) closeModal();
});

document.addEventListener(`keydown`, (e) => {
    if (e.key === `Escape`) closeModal();
});

window.addEventListener(`resize`, () => {
    nav.classList.remove(`open`);
    const submenus = nav.querySelectorAll(`ul > li > ul`);
    submenus.forEach(sub => (sub.style.display = `none`));
});
