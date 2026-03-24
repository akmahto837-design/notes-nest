// --- Page Switching Logic ---
function showPage(pageId, navElement = null) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update Nav UI
    if (navElement) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        navElement.classList.add('active');
    }

    // Close mobile nav if open
    document.getElementById('mobileNav').classList.remove('open');
}

// --- Dark Mode Toggle ---
const darkBtn = document.getElementById('darkBtn');
const htmlEl = document.documentElement;

darkBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    
    // Toggle Icon
    const icon = darkBtn.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// --- Mobile Menu Toggle ---
function toggleMobile() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('open');
}

// --- Generate Mock Data ---
const notes = [
    { title: "Database Normalization", cat: "DBMS", desc: "Guide to 1NF, 2NF, and 3NF with examples." },
    { title: "Java Streams API", cat: "Java", desc: "Master functional programming in Java 8+." },
    { title: "Operating Systems - Scheduling", cat: "OS", desc: "RR, SJF, and Priority scheduling compared." }
];

function loadNotes() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    grid.innerHTML = notes.map(note => `
        <div class="note-card">
            <span class="note-badge">${note.cat}</span>
            <h3 class="note-title">${note.title}</h3>
            <p class="note-desc">${note.desc}</p>
            <div style="margin-top: 1rem;">
                <button class="btn-signup" style="width:100%; padding: 0.5rem;">Download</button>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});