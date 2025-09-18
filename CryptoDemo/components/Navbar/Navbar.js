/**
 * Fetches the Navbar HTML from its file and injects it into the element with the id 'navbar-container'.
 */
export const loadNavbar = async () => {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) {
    console.error('The element with id "navbar-container" was not found.');
    return;
  }

  try {
    const response = await fetch('./components/Navbar/Navbar.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Navbar: ${response.statusText}`);
    }
    const html = await response.text();
    navbarContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading the Navbar:', error);
    navbarContainer.innerHTML =
      '<p class="text-center text-red-500">Error loading navigation bar.</p>';
  }
};
