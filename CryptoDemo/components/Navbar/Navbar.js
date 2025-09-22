/**
 * Updates the navbar to highlight the currently active link(s).
 * This function is exported so the router can call it.
 * @param {string} pageName - The name of the active page (e.g., 'home').
 */
export const setActiveNavLink = (pageName) => {
  // Remove active classes from all links
  const allNavLinks = document.querySelectorAll('.navbar-link');
  allNavLinks.forEach((link) => {
    link.classList.remove(
      'text-white',
      'bg-blue-700',
      'md:text-blue-700',
      'md:dark:text-blue-500'
    );
    link.classList.add('text-gray-900', 'dark:text-white');
    link.removeAttribute('aria-current');
  });

  // Apply active classes to the current link(s)
  // Use querySelectorAll because multiple UI elements (e.g., the logo and the "Home" text link)
  // can point to the same page, and all of them should be managed as active.
  const activeLinks = document.querySelectorAll(`[data-page="${pageName}"]`);
  activeLinks.forEach((link) => {
    link.classList.remove('text-gray-900', 'dark:text-white');
    link.classList.add(
      'text-white',
      'bg-blue-700',
      'md:bg-transparent',
      'md:text-blue-700',
      'md:dark:text-blue-500'
    );
    link.setAttribute('aria-current', 'page');
  });
};

/**
 * Main function to load the navbar and set up its internal click listeners.
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
    navbarContainer.innerHTML = await response.text();

    // Add click listeners to all navigation links
    const navLinks = document.querySelectorAll('.navbar-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the browser from following the href
        const page = link.dataset.page;

        // Dispatch a custom event. The router will listen for this.
        // This decouples the navbar from the router.
        document.dispatchEvent(
          new CustomEvent('navigate', { detail: { page } })
        );
      });
    });

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector(
      '[data-collapse-toggle="navbar-default"]'
    );
    const mobileMenu = document.getElementById('navbar-default');
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  } catch (error) {
    console.error('Error loading the Navbar:', error);
    navbarContainer.innerHTML =
      '<p class="text-center text-red-500">Error loading navigation bar.</p>';
  }
};
