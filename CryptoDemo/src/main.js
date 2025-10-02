import { loadNavbar } from '../components/Navbar/Navbar.js';
import { loadFooter } from '../components/Footer/Footer.js';
import { router } from './router.js';

/**
 * Loads template HTML fragments used throughout the app
 */
async function loadTemplates() {
  const res = await fetch('./utils/templates.html');
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

/**
 * Renders the shared layout components (navbar and footer) in parallel
 */
const renderLayout = async () => {
  await Promise.all([loadNavbar(), loadFooter()]);
};

/**
 * Main execution on page load - optimized with parallel loading
 */
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([loadTemplates(), renderLayout()]);
  router.init();
});
