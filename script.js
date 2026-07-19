// script.js - renders quotes and wires controls
let currentPage = 0;
const quoteContainer = document.getElementById('quoteContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const searchInput = document.getElementById('searchInput');

function createCard(text, id){
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.quoteId = id;

  const p = document.createElement('div');
  p.className = 'quote-text';
  p.textContent = text;

  const meta = document.createElement('div');
  meta.className = 'meta';

  const heart = document.createElement('button');
  heart.className = 'heart';
  heart.title = 'Favorite';
  heart.innerHTML = '🤍';
  heart.addEventListener('click', () => toggleFavorite(id, text, heart));

  const shareBtn = document.createElement('button');
  shareBtn.className = 'share';
  shareBtn.textContent = 'Share';
  shareBtn.addEventListener('click', () => shareQuote(text));

  meta.appendChild(heart);
  meta.appendChild(shareBtn);

  card.appendChild(p);
  card.appendChild(meta);

  return card;
}

function renderQuotes(quotes, append = true){
  const fragment = document.createDocumentFragment();
  quotes.forEach((q, i) => {
    const globalId = currentPage * 1000 + i + Math.floor(Math.random()*1000);
    fragment.appendChild(createCard(q, globalId));
  });
  if(!append) quoteContainer.innerHTML = '';
  quoteContainer.appendChild(fragment);
}

function loadNextPage(){
  const quotes = getQuotesPage(currentPage);
  if(!quotes || quotes.length === 0){
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'No more quotes';
    return;
  }
  renderQuotes(quotes, true);
  currentPage += 1;
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  // restore theme/favorites UI
  applySavedTheme();
  restoreFavoriteUI();

  loadNextPage();

  loadMoreBtn.addEventListener('click', loadNextPage);
  searchInput.addEventListener('input', (e)=>{
    const q = e.target.value.trim().toLowerCase();
    if(!q) {
      // show what's loaded so far
      Array.from(quoteContainer.children).forEach(ch=>ch.style.display='flex');
      return;
    }
    Array.from(quoteContainer.children).forEach(card=>{
      const txt = card.querySelector('.quote-text').textContent.toLowerCase();
      card.style.display = txt.includes(q) ? 'flex' : 'none';
    });
  });
});

