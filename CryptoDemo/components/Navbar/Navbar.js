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

    // Remove all possible classes to ensure a clean slate
    link.classList.remove(...activeClasses, ...inactiveClasses);
    link.removeAttribute('aria-current');

    // Apply the appropriate classes based on active state
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

    // Helper: get menu elements
    const getMenuElements = () => ({
      navLinks: document.querySelectorAll('.navbar-link'),
      mobileMenu: document.getElementById('navbar-default'),
      menuToggle: document.querySelector(
        '[data-collapse-toggle="navbar-default"]'
      ),
    });

    // Unified menu toggle logic
    const { navLinks, mobileMenu, menuToggle } = getMenuElements();

    // Toggle mobile menu visibility
    function setMobileMenuVisible(visible) {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.classList.toggle('hidden', !visible);
      menuToggle.setAttribute('aria-expanded', visible ? 'true' : 'false');
    }

    // Click listeners for navigation links
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = link.dataset.page;
        document.dispatchEvent(
          new CustomEvent('navigate', { detail: { page } })
        );
        // Hide mobile menu after click if open
        if (!mobileMenu.classList.contains('hidden')) {
          setMobileMenuVisible(false);
        }
      });
    });

    // Mobile menu toggle button
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => {
        setMobileMenuVisible(mobileMenu.classList.contains('hidden'));
      });
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconLight = document.getElementById('theme-icon-light');
    const themeIconDark = document.getElementById('theme-icon-dark');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    function applyTheme(theme) {
      if (theme === 'light') {
        html.classList.remove('dark');
        themeIconLight.classList.remove('hidden');
        themeIconDark.classList.add('hidden');
      } else {
        html.classList.add('dark');
        themeIconLight.classList.add('hidden');
        themeIconDark.classList.remove('hidden');
      }
    }
    applyTheme(savedTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
      const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  } catch (error) {
    console.error('Error loading the Navbar:', error);
    navbarContainer.innerHTML =
      '<p class="text-center text-red-500">Error loading navigation bar.</p>';
  }
};
