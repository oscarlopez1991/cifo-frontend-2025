/**
 * Handles API errors and logs them appropriately
 * @param {Error} error - The error object
 * @param {string} context - Where the error occurred (e.g., 'Markets page', 'News API')
 * @returns {string} User-friendly error message
 */
export function handleApiError(error, context = 'API') {
  const errorMessage = `${context} error: ${error.message}`;
  console.error(errorMessage, error);

  // Return user-friendly message based on error type
  if (
    error.message.includes('Failed to fetch') ||
    error.message.includes('NetworkError')
  ) {
    return 'Network error. Please check your connection and try again.';
  }

  if (error.message.includes('404')) {
    return 'The requested data was not found.';
  }

  if (error.message.includes('429')) {
    return 'Too many requests. Please wait a moment and try again.';
  }

  return 'An error occurred while loading data. Please try again later.';
}

/**
 * Displays an error message in a container element
 * @param {HTMLElement} container - The container to display the error in
 * @param {string} pageName - Name of the page/component for context
 * @param {string} customMessage - Optional custom error message
 */
export function displayError(container, pageName, customMessage = null) {
  const message =
    customMessage || `Failed to load ${pageName} page. Please try again later.`;

  const template = document.getElementById('error-display-template');
  const errorNode = template.content.firstElementChild.cloneNode(true);
  errorNode.querySelector('.error-message').textContent = message;

  container.innerHTML = '';
  container.appendChild(errorNode);
}
