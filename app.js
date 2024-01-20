import { renderDashboard } from "./view-dashboard.js";
import { renderDetail } from "./view-detail.js";

if (window.location.search.includes('?country=')) {
    renderDetail();
} else {
    document.querySelector('.filters').classList.add('active');
    renderDashboard();
}

document.querySelector('header button').addEventListener('click', () => {
    
    if (document.body.classList.contains('dark')) {
        document.body.classList.remove('dark');
    } else {
        document.body.classList.add('dark');
    }
})