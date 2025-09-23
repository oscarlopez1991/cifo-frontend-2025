import { loadNavbar } from '../components/Navbar/Navbar.js';
import { loadFooter } from '../components/Footer/Footer.js';
import { router } from './router.js';

// This function renders the shared layout components
const renderLayout = async () => {
  await loadNavbar();
  await loadFooter();
};

// Add at the top of src/main.js
async function loadTemplates() {
  const res = await fetch('./utils/templates.html');
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

// Main execution on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadTemplates();
  await renderLayout();
  router.init();
});
