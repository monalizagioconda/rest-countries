import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

if (window.location.search.includes('?country=')) {
    renderDetail();
} else {
    document.querySelector('.filters').classList.add('active');
    renderDashboard();
}

const modeLabel = document.querySelector('.header-content button span');

// JS wykrywa jakie są ustawienia theme w lokalnym komputerze.
// Po zastosowaniu matchMedia i property mql - matches nie trzeba w css-ie stosować styli @media(prefers...)
const mql = matchMedia('(prefers-color-scheme: dark)')

let theme = localStorage.getItem('theme') || (mql.matches ? 'dark' : 'light');

modeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';

const { body } = document;

body.classList.add(theme);

document.querySelector('header button').addEventListener('click', () => {
    if (theme === 'dark') {
        theme = 'light';
        body.classList.remove('dark');
        body.classList.add(theme);
        localStorage.setItem('theme', theme)
        modeLabel.textContent = 'Dark Mode';
    } else {
        theme = 'dark';
        body.classList.remove('light');
        body.classList.add(theme);
        localStorage.setItem('theme', theme)
        modeLabel.textContent = 'Light Mode';
    }
})
