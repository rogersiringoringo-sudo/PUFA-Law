// ===== ADMIN =====
function openLogin() {
  document.getElementById('loginWrap').classList.add('open');
  document.getElementById('loginError').style.display = 'none';
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPass').value = '';
}
function closeLogin() {
  document.getElementById('loginWrap').classList.remove('open');
}
function doLogin() {
  const email = document.getElementById('loginEmail').value;
  const pass = document.getElementById('loginPass').value;
  if (email === 'admin@pufalaw.id' && pass === 'pufalaw2026') {
    document.getElementById('loginWrap').classList.remove('open');
    document.getElementById('adminOverlay').classList.add('open');
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}
function closeAdmin() {
  document.getElementById('adminOverlay').classList.remove('open');
}
function showAdminSection(id, btn) {
  document.querySelectorAll('.admin-section-content').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}
function toggleAddEventForm() {
  const f = document.getElementById('addEventForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}
function submitContact() {
  alert('Terima kasih! Pesan Anda telah terkirim. Tim PUFA Law akan menghubungi Anda segera.');
}

// ===== LOGIN ENTER KEY =====
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.getElementById('loginWrap').classList.contains('open')) {
    doLogin();
  }
});
