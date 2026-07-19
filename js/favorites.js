// js/favorites.js
// Manage favorites using localStorage key 'lm_favorites'
function getFavorites(){
  try{
    return JSON.parse(localStorage.getItem('lm_favorites') || '[]');
  }catch(e){return []}
}
function saveFavorites(arr){
  localStorage.setItem('lm_favorites', JSON.stringify(arr));
}

function isFavorited(id){
  return getFavorites().some(f => f.id === id);
}

function toggleFavorite(id, text, btn){
  const favs = getFavorites();
  const idx = favs.findIndex(f=>f.id===id);
  if(idx === -1){
    favs.push({id, text});
    btn.innerHTML = '❤️';
  } else {
    favs.splice(idx,1);
    btn.innerHTML = '🤍';
  }
  saveFavorites(favs);
}

function restoreFavoriteUI(){
  const favs = getFavorites();
  const map = new Map(favs.map(f=>[f.id,true]));
  Array.from(document.querySelectorAll('.card')).forEach(card=>{
    const id = Number(card.dataset.quoteId);
    const btn = card.querySelector('.heart');
    if(map.has(id)) btn.innerHTML = '❤️';
    else btn.innerHTML = '🤍';
    // attach click if not already attached (cards rendered dynamically may re-add)
  });
}

// Also update UI on dynamic insertions by observing the container
const observer = new MutationObserver(()=>restoreFavoriteUI());
observer.observe(document.getElementById('quoteContainer'),{childList:true,subtree:false});
