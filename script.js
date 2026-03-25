// ===== DATA =====
const NOTES = [
  {id:1,title:"Complete DBMS Notes — All Units",subject:"DBMS",desc:"Comprehensive coverage of ER models, normalization, SQL, transactions and concurrency control with solved examples.",downloads:1842,rating:4.9,date:"2025-06-10",icon:"🗄️",iconBg:"linear-gradient(135deg,#4f46e5,#7c3aed)",badge:"badge-purple",author:"Rohan M.",bookmarked:false,liked:false},
  {id:2,title:"Discrete Maths Full Notes",subject:"Maths",desc:"Graph theory, set theory, logic, relations, functions and combinatorics — perfect for exams.",downloads:1540,rating:4.8,date:"2025-06-08",icon:"📐",iconBg:"linear-gradient(135deg,#0277bd,#00c6fb)",badge:"badge-blue",author:"Priya S.",bookmarked:false,liked:false},
  {id:3,title:"Operating Systems — Scheduling & Memory",subject:"OS",desc:"Process scheduling algorithms, memory management, virtual memory, paging and segmentation clearly explained.",downloads:1320,rating:4.7,date:"2025-06-07",icon:"⚙️",iconBg:"linear-gradient(135deg,#e07d00,#f59e0b)",badge:"badge-orange",author:"Aditya K.",bookmarked:false,liked:false},
  {id:4,title:"Java OOP Concepts — Complete Guide",subject:"Java",desc:"Inheritance, polymorphism, abstraction, encapsulation, interfaces, generics with code examples for each topic.",downloads:2100,rating:4.9,date:"2025-06-05",icon:"☕",iconBg:"linear-gradient(135deg,#b91c1c,#ef4444)",badge:"badge-red",author:"Sneha R.",bookmarked:false,liked:false},
  {id:5,title:"DSA — Arrays, Trees & Graphs",subject:"DSA",desc:"Data structures with algorithm complexity analysis, BFS, DFS, sorting algorithms and dynamic programming.",downloads:1890,rating:4.8,date:"2025-06-04",icon:"🌳",iconBg:"linear-gradient(135deg,#047857,#10b981)",badge:"badge-green",author:"Vikram P.",bookmarked:false,liked:false},
  {id:6,title:"Computer Networks — OSI & TCP/IP",subject:"Networks",desc:"OSI model layers, TCP/IP protocols, subnetting, routing algorithms, and network security basics.",downloads:980,rating:4.6,date:"2025-06-01",icon:"🌐",iconBg:"linear-gradient(135deg,#0e7490,#06b6d4)",badge:"badge-teal",author:"Anjali T.",bookmarked:false,liked:false},
  {id:7,title:"Quantum Physics — Wave Mechanics",subject:"Physics",desc:"Schrödinger equation, wave-particle duality, uncertainty principle, hydrogen atom and quantum numbers.",downloads:760,rating:4.5,date:"2025-05-30",icon:"⚛️",iconBg:"linear-gradient(135deg,#7c3aed,#a78bfa)",badge:"badge-purple",author:"Nikhil A.",bookmarked:false,liked:false},
  {id:8,title:"Organic Chemistry Reactions Handbook",subject:"Chemistry",desc:"All named reactions, reagents, mechanisms and product predictions organized for quick revision.",downloads:1100,rating:4.7,date:"2025-05-28",icon:"🧪",iconBg:"linear-gradient(135deg,#0277bd,#00c6fb)",badge:"badge-blue",author:"Divya M.",bookmarked:false,liked:false},
  {id:9,title:"DBMS SQL Queries — Practice Set",subject:"DBMS",desc:"100+ SQL queries with solutions: joins, subqueries, window functions, triggers and stored procedures.",downloads:1450,rating:4.8,date:"2025-05-25",icon:"💾",iconBg:"linear-gradient(135deg,#4f46e5,#7c3aed)",badge:"badge-purple",author:"Rahul G.",bookmarked:false,liked:false},
  {id:10,title:"Linear Algebra Crash Course",subject:"Maths",desc:"Vectors, matrices, eigenvalues, eigenvectors, linear transformations with worked examples and proofs.",downloads:870,rating:4.6,date:"2025-05-22",icon:"🔢",iconBg:"linear-gradient(135deg,#0277bd,#00c6fb)",badge:"badge-blue",author:"Pooja B.",bookmarked:false,liked:false},
  {id:11,title:"OS Deadlocks & Synchronization",subject:"OS",desc:"Deadlock conditions, Banker's algorithm, semaphores, mutex, monitors and classic synchronization problems.",downloads:690,rating:4.5,date:"2025-05-18",icon:"🔒",iconBg:"linear-gradient(135deg,#e07d00,#f59e0b)",badge:"badge-orange",author:"Arjun S.",bookmarked:false,liked:false},
  {id:12,title:"Java Multithreading & Concurrency",subject:"Java",desc:"Thread lifecycle, synchronization, concurrent collections, executor framework and CompletableFuture.",downloads:1230,rating:4.7,date:"2025-05-15",icon:"🧵",iconBg:"linear-gradient(135deg,#b91c1c,#ef4444)",badge:"badge-red",author:"Kavitha R.",bookmarked:false,liked:false},
];

const LEADERS = [
  {name:"Sneha Reddy",notes:28,pts:3420,av:"SR",color:"linear-gradient(135deg,#667eea,#764ba2)"},
  {name:"Vikram Patel",notes:22,pts:2870,av:"VP",color:"linear-gradient(135deg,#f59e0b,#ef4444)"},
  {name:"Anjali Tiwari",notes:19,pts:2340,av:"AT",color:"linear-gradient(135deg,#10b981,#06b6d4)"},
  {name:"Rohan Mehta",notes:16,pts:1960,av:"RM",color:"linear-gradient(135deg,#3b5bff,#00c6fb)"},
  {name:"Priya Singh",notes:14,pts:1720,av:"PS",color:"linear-gradient(135deg,#c471ed,#f64f59)"},
];

let activeCat = 'All';
let notesActiveCat = 'All';
let bookmarks = new Set();
let likes = new Set();

// ===== PAGE ROUTER =====
function showPage(id, linkEl, closeMobile) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  if(linkEl) linkEl.classList.add('active');
  if(closeMobile) document.getElementById('mobileNav').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

function toggleMobile(){
  document.getElementById('mobileNav').classList.toggle('open');
}

// ===== DARK MODE =====
const darkBtn = document.getElementById('darkBtn');
darkBtn.addEventListener('click',()=>{
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme', isDark?'light':'dark');
  darkBtn.innerHTML = isDark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
});

// ===== TOAST =====
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2800);
}

// ===== COUNTER ANIMATION =====
function animateCount(el, target, suffix=''){
  let cur=0; const step=Math.ceil(target/60);
  const iv = setInterval(()=>{
    cur = Math.min(cur+step, target);
    el.textContent = cur.toLocaleString()+suffix;
    if(cur>=target) clearInterval(iv);
  },22);
}
setTimeout(()=>{
  animateCount(document.getElementById('cnt1'),12400,'+');
  animateCount(document.getElementById('cnt2'),54000,'+');
  animateCount(document.getElementById('cnt3'),230000,'+');
},400);

// ===== NOTE CARD BUILDER =====
function noteCard(n, idx){
  const bk = bookmarks.has(n.id);
  const lk = likes.has(n.id);
  return `<div class="note-card" style="animation:fadeUp 0.5s ${idx*0.06}s ease both;opacity:0">
    <div class="note-card-top">
      <div class="note-icon" style="background:${n.iconBg}">${n.icon}</div>
      <div class="note-card-actions">
        <button class="icon-btn ${lk?'active':''}" title="Like" onclick="toggleLike(${n.id},this)"><i class="fa-${lk?'solid':'regular'} fa-thumbs-up"></i></button>
        <button class="icon-btn ${bk?'active':''}" title="Bookmark" onclick="toggleBookmark(${n.id},this)"><i class="fa-${bk?'solid':'regular'} fa-bookmark"></i></button>
      </div>
    </div>
    <span class="note-badge ${n.badge}">${n.subject}</span>
    <div class="note-title">${n.title}</div>
    <div class="note-desc">${n.desc}</div>
    <div class="note-meta">
      <span class="note-meta-item"><i class="fa-solid fa-download"></i> ${n.downloads.toLocaleString()}</span>
      <span class="note-meta-item"><span class="stars">★★★★★</span> ${n.rating}</span>
      <span class="note-meta-item"><i class="fa-regular fa-calendar"></i> ${n.date}</span>
    </div>
    <div class="note-card-footer">
      <button class="btn-download" onclick="fakeDownload()"><i class="fa-solid fa-download"></i> Download</button>
      <button class="btn-preview" onclick="openModal('${n.title}','${n.desc}')"><i class="fa-solid fa-eye"></i></button>
    </div>
  </div>`;
}

function skeletonCard(){
  return `<div class="skel-card">
    <div style="display:flex;gap:0.75rem"><div class="skeleton skel-icon"></div><div style="flex:1;display:flex;flex-direction:column;gap:0.5rem"><div class="skeleton skel-line skel-md"></div><div class="skeleton skel-line skel-sm"></div></div></div>
    <div class="skeleton skel-line skel-lg"></div>
    <div class="skeleton skel-line" style="width:90%"></div>
    <div class="skeleton skel-line" style="width:80%"></div>
    <div class="skeleton skel-btn"></div>
  </div>`;
}

function showSkeletons(container, count=4){
  container.innerHTML = Array(count).fill(skeletonCard()).join('');
}

// ===== FEATURED GRID =====
function renderFeatured(){
  const grid = document.getElementById('featuredGrid');
  showSkeletons(grid,4);
  setTimeout(()=>{
    const sorted = [...NOTES].sort((a,b)=>b.downloads-a.downloads).slice(0,4);
    grid.innerHTML = sorted.map((n,i)=>noteCard(n,i)).join('');
  },900);
}

// ===== RECENT GRID =====
function renderRecent(){
  const grid = document.getElementById('recentGrid');
  showSkeletons(grid,4);
  setTimeout(()=>{
    const sorted = [...NOTES].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,4);
    grid.innerHTML = sorted.map((n,i)=>noteCard(n,i)).join('');
  },1100);
}

// ===== LEADERBOARD =====
function renderLeaders(){
  const medals = ['🥇','🥈','🥉','4️⃣','5️⃣'];
  document.getElementById('leaderList').innerHTML = LEADERS.map((l,i)=>`
    <div class="leader-item" style="animation:fadeUp 0.5s ${i*0.08}s ease both;opacity:0">
      <div class="leader-rank rank-${i+1}">${medals[i]}</div>
      <div class="leader-av" style="background:${l.color}">${l.av}</div>
      <div class="leader-info"><h4>${l.name}</h4><p>${l.notes} notes uploaded</p></div>
      <div class="leader-pts">${l.pts.toLocaleString()} pts</div>
    </div>`).join('');
}

// ===== NOTES PAGE =====
function renderNotesPage(){
  const search = document.getElementById('notesSearch').value.toLowerCase();
  const sort = document.getElementById('notesSort').value;
  let filtered = NOTES.filter(n=>{
    const matchCat = notesActiveCat==='All' || n.subject===notesActiveCat;
    const matchSearch = !search || n.title.toLowerCase().includes(search) || n.subject.toLowerCase().includes(search) || n.desc.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });
  if(sort==='downloads') filtered.sort((a,b)=>b.downloads-a.downloads);
  else if(sort==='rating') filtered.sort((a,b)=>b.rating-a.rating);
  else filtered.sort((a,b)=>new Date(b.date)-new Date(a.date));
  const grid = document.getElementById('notesPageGrid');
  if(!filtered.length){
    grid.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text2)"><i class="fa-solid fa-face-sad-tear" style="font-size:3rem;opacity:0.4;display:block;margin-bottom:1rem"></i>No notes found. Try a different search.</div>';
    return;
  }
  grid.innerHTML = filtered.map((n,i)=>noteCard(n,i)).join('');
}

function notesFilterCat(cat, btn){
  notesActiveCat = cat;
  document.querySelectorAll('#notesCatBar .cat-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderNotesPage();
}

// ===== HERO SEARCH =====
function heroSearchFn(val){
  if(val.length>2){
    document.getElementById('notesSearch').value=val;
    showPage('notes');
    renderNotesPage();
  }
}

function filterCat(cat, el){
  document.querySelectorAll('.hero-cat').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  activeCat=cat;
}

// ===== ACTIONS =====
function toggleBookmark(id, btn){
  if(bookmarks.has(id)){bookmarks.delete(id);btn.classList.remove('active');btn.innerHTML='<i class="fa-regular fa-bookmark"></i>';showToast('Bookmark removed');}
  else{bookmarks.add(id);btn.classList.add('active');btn.innerHTML='<i class="fa-solid fa-bookmark"></i>';showToast('📌 Note bookmarked!');}
}
function toggleLike(id, btn){
  if(likes.has(id)){likes.delete(id);btn.classList.remove('active');btn.innerHTML='<i class="fa-regular fa-thumbs-up"></i>';showToast('Like removed');}
  else{likes.add(id);btn.classList.add('active');btn.innerHTML='<i class="fa-solid fa-thumbs-up"></i>';showToast('👍 Note liked!');}
}
function fakeDownload(){showToast('⬇️ Download started!');}

// ===== MODAL =====
function openModal(title, desc){
  document.getElementById('modalTitle').textContent=title;
  document.getElementById('modalDesc').textContent=desc+'\n\nPreview not available in demo. Download to access the full file.';
  document.getElementById('previewModal').classList.add('open');
}
function closeModal(){document.getElementById('previewModal').classList.remove('open');}
document.getElementById('previewModal').addEventListener('click',function(e){if(e.target===this)closeModal();});

// ===== UPLOAD =====
function dragOver(e){e.preventDefault();document.getElementById('dropzone').classList.add('dragover');}
function dragLeave(){document.getElementById('dropzone').classList.remove('dragover');}
function dropFile(e){e.preventDefault();dragLeave();const f=e.dataTransfer.files[0];if(f)handleFile(f);}
function fileSelected(input){if(input.files[0])handleFile(input.files[0]);}
function handleFile(f){
  document.getElementById('fileNameShow').textContent='📎 '+f.name;
}
function submitUpload(){
  const t=document.getElementById('upTitle').value;
  const s=document.getElementById('upSubject').value;
  if(!t||!s){showToast('⚠️ Please fill in all required fields');return;}
  const pw=document.getElementById('progressWrap');
  const pb=document.getElementById('progressBar');
  const pl=document.getElementById('progressLabel');
  pw.style.display='block';
  let p=0;
  const iv=setInterval(()=>{
    p=Math.min(p+Math.random()*12,100);
    pb.style.width=p+'%';
    pl.textContent=Math.round(p)+'%';
    if(p>=100){clearInterval(iv);setTimeout(()=>{pw.style.display='none';document.getElementById('successMsg').style.display='block';showToast('✅ Notes uploaded successfully!');},300);}
  },120);
}

// ===== AUTH =====
function switchAuth(tab, btn){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  if(btn) btn.classList.add('active');
  else document.querySelectorAll('.auth-tab').forEach(t=>{if(t.textContent.toLowerCase().includes(tab))t.classList.add('active');});
  document.getElementById('authFormLogin').style.display = tab==='login'?'block':'none';
  document.getElementById('authFormSignup').style.display = tab==='signup'?'block':'none';
}
function fakeLogin(){showToast('✅ Logged in successfully!');setTimeout(()=>showPage('dash'),500);}

// ===== DASHBOARD =====
function switchDashTab(id, btn){
  document.querySelectorAll('.dash-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.dash-content > div').forEach(d=>d.classList.remove('active'));
  document.getElementById('dash-'+id).classList.add('active');
}

function renderDash(){
  const myNotes=[NOTES[0],NOTES[2],NOTES[4],NOTES[7]];
  document.getElementById('dash-my').innerHTML = myNotes.map(n=>`
    <div class="dash-note-row">
      <div class="note-icon" style="background:${n.iconBg};width:40px;height:40px;border-radius:10px;font-size:1rem">${n.icon}</div>
      <div class="dash-note-info"><h4>${n.title}</h4><p>${n.subject} · ${n.downloads.toLocaleString()} downloads · ⭐ ${n.rating}</p></div>
      <div class="dash-row-actions">
        <button class="btn-edit"><i class="fa-solid fa-pen"></i> Edit</button>
        <button class="btn-del" onclick="showToast('🗑️ Note deleted')"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`).join('');

  const bkNotes = NOTES.slice(1,4);
  document.getElementById('dash-bookmarks').innerHTML = bkNotes.map(n=>`
    <div class="dash-note-row">
      <div class="note-icon" style="background:${n.iconBg};width:40px;height:40px;border-radius:10px;font-size:1rem">${n.icon}</div>
      <div class="dash-note-info"><h4>${n.title}</h4><p>${n.subject} · ⭐ ${n.rating}</p></div>
      <div class="dash-row-actions"><button class="btn-download" style="border-radius:8px;padding:0.35rem 0.8rem;font-size:0.75rem" onclick="fakeDownload()"><i class="fa-solid fa-download"></i></button></div>
    </div>`).join('');

  const likedNotes = NOTES.slice(3,6);
  document.getElementById('dash-liked').innerHTML = likedNotes.map(n=>`
    <div class="dash-note-row">
      <div class="note-icon" style="background:${n.iconBg};width:40px;height:40px;border-radius:10px;font-size:1rem">${n.icon}</div>
      <div class="dash-note-info"><h4>${n.title}</h4><p>${n.subject} · ${n.downloads.toLocaleString()} downloads</p></div>
      <div class="dash-row-actions"><button class="btn-download" style="border-radius:8px;padding:0.35rem 0.8rem;font-size:0.75rem" onclick="fakeDownload()"><i class="fa-solid fa-download"></i></button></div>
    </div>`).join('');
}

// ===== INIT =====
renderFeatured();
renderRecent();
renderLeaders();
renderNotesPage();
renderDash();