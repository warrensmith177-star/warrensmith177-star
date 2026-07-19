// js/darkmode.js
const darkBtn = document.getElementById('darkBtn');
function applySavedTheme(){
  const saved = localStorage.getItem('lm_theme');
  if(saved === 'dark') document.body.classList.add('dark');
  updateDarkIcon();
}
function toggleDark(){
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('lm_theme', isDark ? 'dark' : 'light');
  updateDarkIcon();
}
function updateDarkIcon(){
  if(!darkBtn) return;
  darkBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}
if(darkBtn) darkBtn.addEventListener('click', toggleDark);
