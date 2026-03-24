// --- Supabase Initialization ---
// REPLACE THESE WITH YOUR ACTUAL SUPABASE URL AND ANON KEY
const SUPABASE_URL = 'https://ekupnytnamynytfmozps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXBueXRuYW15bnl0Zm1venBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjg1MTMsImV4cCI6MjA4OTk0NDUxM30.PC_IdsiDyE77Qt9BYVPS6abJwT-rP4HZ1dMbWG1GEps';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- Fetch and Render Data from Supabase ---
async function loadNotes(searchQuery = '') {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    grid.innerHTML = '<p>Loading notes...</p>'; // Show loading state

    try {
        let query = supabase.from('notes').select('*').order('created_at', { ascending: false });

        // If a search query exists, filter by title or category
        if (searchQuery) {
            query = query.ilike('title', `%${searchQuery}%`);
        }

        const { data: notes, error } = await query;

        if (error) throw error;

        if (notes.length === 0) {
            grid.innerHTML = '<p>No notes found.</p>';
            return;
        }

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

    } catch (err) {
        console.error("Error fetching notes:", err);
        grid.innerHTML = '<p>Error loading notes. Please try again later.</p>';
    }
}

// --- Search Functionality ---
document.querySelector('.hero-search-btn').addEventListener('click', () => {
    const searchInput = document.getElementById('heroSearch').value;
    loadNotes(searchInput);
});

document.getElementById('heroSearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchInput = document.getElementById('heroSearch').value;
        loadNotes(searchInput);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});