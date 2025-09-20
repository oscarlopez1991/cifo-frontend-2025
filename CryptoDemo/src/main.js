import { loadNavbar } from '../components/Navbar/Navbar.js';
import { loadFooter } from '../components/Footer/Footer.js';
import { loadHomePage } from '../pages/Home/Home.js';

// This function renders the shared layout components
const renderLayout = () => {
  loadNavbar();
  loadFooter();
};

// Main execution on page load
document.addEventListener('DOMContentLoaded', () => {
  renderLayout();

  // Load the home page content
  loadHomePage();
});
