// js/share.js
async function shareQuote(text){
  const payload = {title:'Love Message',text};
  try{
    if(navigator.share){
      await navigator.share(payload);
      return;
    }
  }catch(e){
    console.warn('share failed',e);
  }
  // fallback: copy to clipboard
  try{
    await navigator.clipboard.writeText(text);
    alert('Quote copied to clipboard — paste to share.');
  }catch(e){
    // final fallback: prompt
    window.prompt('Copy this quote', text);
  }
}
