import { loadNavbar } from '../components/Navbar/Navbar.js';
import { loadFooter } from '../components/Footer/Footer.js';
import { router } from './router.js';

// This function renders the shared layout components
const renderLayout = async () => {
  await loadNavbar();
  await loadFooter();
};

// Main execution on page load
document.addEventListener('DOMContentLoaded', async () => {
  await renderLayout();
  router.init();
});
