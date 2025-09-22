/**
 * Updates the navbar to highlight the currently active link(s).
 * This function is exported so the router can call it.
 * @param {string} pageName - The name of the active page (e.g., 'home').
 */
export const setActiveNavLink = (pageName) => {
  const allNavLinks = document.querySelectorAll('.navbar-link');

  // Define the class sets ONCE.
  const activeClasses = [
    'bg-blue-700',
    'text-white',
    'md:bg-transparent',
    'md:text-blue-700',
    'dark:md:text-blue-500',
  ];
  const inactiveClasses = [
    'text-gray-900',
    'dark:text-white',
    'hover:bg-gray-100',
    'md:hover:bg-transparent',
    'md:hover:text-blue-700',
  ];

  allNavLinks.forEach((link) => {
    const isLinkActive = link.dataset.page === pageName;

    // Remove all possible classes to ensure a clean slate.
    link.classList.remove(...activeClasses, ...inactiveClasses);
    link.removeAttribute('aria-current');

    if (isLinkActive) {
      link.classList.add(...activeClasses);
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.add(...inactiveClasses);
    }
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
