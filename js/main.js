const mainWrapper = document.querySelector('.main');
const themeSwitcher = document.querySelector('.theme-switcher');
themeSwitcher.addEventListener('click', () => {
    themeSwitcher.classList.toggle('theme-switcher_light');
    mainWrapper.classList.toggle('main_light');
});