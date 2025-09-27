/**
 * Renders an error message for a failed page load.
 * Displays a user-friendly error template with a title and message.
 * @param {HTMLElement} appContainer - The container element to append the error to.
 * @param {string} pageName - The name of the page that failed to load (e.g., 'Home').
 * @param {string} message - Optional custom error message; defaults to a refresh prompt.
 */
export function renderPageError(
  appContainer,
  pageName,
  message = 'Please refresh the page to try again.'
) {
  // Get the error template from the DOM
  const pageErrorTemplate = document.getElementById('page-error-template');
  // Clone the template content to create a new error node
  const errorNode = pageErrorTemplate.content.firstElementChild.cloneNode(true);
  // Set the error title with the page name
  errorNode.querySelector('.error-title').textContent =
    `Error Loading ${pageName} Page`;
  // Set the error message
  errorNode.querySelector('.error-message').textContent = message;
  // Clear the app container and append the error node
  appContainer.innerHTML = '';
  appContainer.appendChild(errorNode);
}
