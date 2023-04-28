function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function searchWords(searchTerms) {
  const regexTerms = searchTerms.map(term => escapeRegExp(term.trim())).join('|');
  const regex = new RegExp(`(${regexTerms})`, 'gi');
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    const matches = node.textContent.match(regex);

    if (matches) {
      const newNode = document.createElement('span');
      newNode.innerHTML = node.textContent.replace(regex, (match) => {
        return `<mark>${match}</mark>`;
      });
      node.parentNode.replaceChild(newNode, node);
    }
  });
}

chrome.runtime.onMessage.addListener(({ searchTerms }) => {
  if (searchTerms) {
    searchWords(searchTerms);
  }
});
