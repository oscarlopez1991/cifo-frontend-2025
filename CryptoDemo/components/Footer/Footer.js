/**
 * Fetches the Footer HTML from its file and injects it into the element with the id 'footer-container'.
 */
export const loadFooter = async () => {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) {
    console.error('The element with id "footer-container" was not found.');
    return;
  }

  try {
    const response = await fetch('./components/Footer/Footer.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Footer: ${response.statusText}`);
    }
    const html = await response.text();
    footerContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading the Footer:', error);
    footerContainer.innerHTML =
      '<p class="text-center text-red-500">Error loading footer.</p>';
  }
};
