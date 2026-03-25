// ===== SUPABASE CONFIGURATION =====
// Replace these with your actual Project URL and Anon Key from Supabase Settings
const SUPABASE_URL = 'https://ekupnytnamynytfmozps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXBueXRuYW15bnl0Zm1venBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjg1MTMsImV4cCI6MjA4OTk0NDUxM30.PC_IdsiDyE77Qt9BYVPS6abJwT-rP4HZ1dMbWG1GEps';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== DATA =====
let NOTES = [
  {id:1,title:"Complete DBMS Notes — All Units",subject:"DBMS",desc:"Comprehensive coverage of ER models, normalization, SQL, transactions and concurrency control with solved examples.",downloads:1842,rating:4.9,date:"2025-06-10",icon:"🗄️",iconBg:"linear-gradient(135deg,#4f46e5,#7c3aed)",badge:"badge-purple",author:"Rohan M.",bookmarked:false,liked:false},
  // ... (You can keep the rest of your static NOTES array for now or fetch from DB)
];

const LEADERS = [
  {name:"Sneha Reddy",notes:28,pts:3420,av:"SR",color:"linear-gradient(135deg,#667eea,#764ba2)"},
  {name:"Vikram Patel",notes:22,pts:2870,av:"VP",color:"linear-gradient(135deg,#f59e0b,#ef4444)"},
];

let activeCat = 'All';
let notesActiveCat = 'All';
let bookmarks = new Set();
let likes = new Set();

// ===== AUTHENTICATION LOGIC =====

async function handleLogin() {
  const email = document.querySelector('#authFormLogin input[type="email"]').value;
  const password = document.querySelector('#authFormLogin input[type="password"]').value;

  if (!email || !password) {
    showToast('⚠️ Please enter email and password');
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    showToast('❌ ' + error.message);
  } else {
    showToast('✅ Welcome back!');
    setTimeout(() => {
      showPage('dash');
      renderDash();
    }, 500);
  }
}

async function handleSignup() {
  const name = document.querySelector('#authFormSignup input[placeholder="Your name"]').value;
  const email = document.querySelector('#authFormSignup input[type="email"]').value;
  const password = document.querySelector('#authFormSignup input[type="password"]').value;

  if (!email || !password || !name) {
    showToast('⚠️ Please fill all fields');
    return;
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { full_name: name }
    }
  });

  if (error) {
    showToast('❌ ' + error.message);
  } else {
    showToast('📧 Check your email for verification!');
    switchAuth('login');
  }
}

async function handleLogout() {
  const { error } = await supabaseClient.auth.signOut();
  showToast('Logged out');
  showPage('home');
}

// ===== UI & ROUTING (Keep your existing functions) =====

function showPage(id, linkEl, closeMobile) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  if(linkEl) linkEl.classList.add('active');
  if(closeMobile) document.getElementById('mobileNav').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

function switchAuth(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('authFormLogin').style.display = tab==='login'?'block':'none';
  document.getElementById('authFormSignup').style.display = tab==='signup'?'block':'none';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

// Ensure you update the button click listeners in your script or HTML
// (Rest of your original script.js: toggleMobile, dark mode, render functions...)