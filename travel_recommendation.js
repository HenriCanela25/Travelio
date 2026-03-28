const searchGroup = document.getElementById('searchGroup');
const navBar = document.getElementsByTagName('nav')[0];

window.addEventListener('scroll', () => {
    if (window.scrollY > 100){
        searchGroup.classList.add('hidden');
        navBar.classList.add('scrolled');
    } else {
        searchGroup.classList.remove('hidden');
        navBar.classList.remove('scrolled');
    }
});