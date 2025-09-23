export function renderPageError(
  appContainer,
  pageName,
  message = 'Please refresh the page to try again.'
) {
  const pageErrorTemplate = document.getElementById('page-error-template');
  const errorNode = pageErrorTemplate.content.firstElementChild.cloneNode(true);
  errorNode.querySelector('.error-title').textContent =
    `Error Loading ${pageName} Page`;
  errorNode.querySelector('.error-message').textContent = message;
  appContainer.innerHTML = '';
  appContainer.appendChild(errorNode);
}
