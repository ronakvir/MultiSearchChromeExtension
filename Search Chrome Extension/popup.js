document.getElementById('searchBtn').addEventListener('click', () => {
    const searchTerms = document.getElementById('searchTerms').value;
    const trimmedTerms = searchTerms.split(',').map(term => term.trim());
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { searchTerms: trimmedTerms });
    });
  });
  