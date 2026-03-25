// ===== SUPABASE CONFIGURATION =====
const SUPABASE_URL = 'https://ekupnytnamynytfmozps.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdXBueXRuYW15bnl0Zm1venBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNjg1MTMsImV4cCI6MjA4OTk0NDUxM30.PC_IdsiDyE77Qt9BYVPS6abJwT-rP4HZ1dMbWG1GEps';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ===== UPDATED LOGIN FUNCTION =====
async function handleLogin() {
  const emailInput = document.querySelector('#authFormLogin input[type="email"]');
  const passwordInput = document.querySelector('#authFormLogin input[type="password"]');

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value,
  });

  if (error) {
    showToast('❌ ' + error.message);
  } else {
    showToast('✅ Logged in successfully!');
    setTimeout(() => {
      showPage('dash');
      renderDash();
    }, 500);
  }
}

// ===== UPDATED SIGNUP FUNCTION =====
async function handleSignup() {
  const nameInput = document.querySelector('#authFormSignup input[placeholder="Your name"]');
  const emailInput = document.querySelector('#authFormSignup input[type="email"]');
  const passwordInput = document.querySelector('#authFormSignup input[type="password"]');

  const { data, error } = await supabaseClient.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value,
    options: {
      data: { full_name: nameInput.value }
    }
  });

  if (error) {
    showToast('❌ ' + error.message);
  } else {
    showToast('📧 Verification email sent!');
    switchAuth('login');
  }
}