# Crypto Demo

A simple web app for tracking crypto currency data and news, built as a Single Page Application (SPA) using vanilla JavaScript for dynamic routing and content loading without page reloads.

## Demo

![Snapshot](assets/CryptoDemo.png)

### Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/oscarlopez1991/cifo-frontend-2025.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd CryptoDemo
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Start the Tailwind CSS build process:**
    ```sh
    npm run build:css
    ```
5.  **Configure NewsAPI key:**
    - Register at [NewsAPI.org](https://newsapi.org/) and generate your free API key.
    - Create a file named `config.js` in the root of the project with the following content:
      ```js
      export const NEWSAPI_KEY = 'YOUR_API_KEY_HERE';
      ```
    - Make sure `config.js` is included in `.gitignore` so it is not uploaded to GitHub.

6.  **Start the development server:**

Use the **Five Server** extension in VS Code:

1. Right-click `index.html`.
2. Select **Open with Five Server**.

This gives you hot reload without modifying SVGs (unlike Live Server).

## Features

- Real-time cryptocurrency price tracking (CoinGecko API)
- Interactive charts for price history and analytics (ApexCharts)
- Trending coins and market overview
- Latest crypto news and articles (NewsAPI)
- Responsive design for desktop and mobile (Tailwind CSS)
- Theme switcher (light/dark mode)
- Modal dialogs for analytics and details (Flowbite)

## Tech Stack

- **Languages**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS, custom CSS for theming and responsive layouts
- **APIs Consumed**:
  - [CoinGecko API](https://www.coingecko.com/en/api/documentation) for cryptocurrency prices, charts, and trending coins
  - [NewsAPI](https://newsapi.org/docs) for the latest crypto news and articles
- **Tooling**:
  - Node.js & npm for dependency management and scripts
  - ESLint (for code linting, using [eslint.config.mjs](eslint.config.mjs))
  - Prettier (for code formatting, using [.prettierrc](.prettierrc))
  - Flowbite (UI components and modal support)
  - ApexCharts (interactive charts for analytics)

## Project Structure

The project follows a modular structure to separate concerns and improve maintainability:

- `/assets`: Static assets such as images (e.g., logo.png) and vendor libraries (e.g., Flowbite JavaScript files).
- `/components`: Reusable UI components, each with their own HTML, CSS, and JavaScript files (e.g., AnalyticsModal for charts, Footer for site credits, Navbar for navigation and theme toggle).
- `/pages`: Page-specific logic, templates, and styles (e.g., Home for crypto cards, Markets for sortable tables, News for articles and trending coins).
- `/services`: Centralized API communication, caching, and data fetching (e.g., CoinGecko API for prices/charts, NewsAPI for articles, cache management).
- `/src`: Core application logic, including routing, initialization, and event handling (e.g., main.js for app startup, router.js for navigation).
- `/utils`: Helper utilities and shared functions (e.g., device detection for responsive behavior).
- Root files: Configuration and entry points (e.g., `index.html` as the main page, `tailwind.config.js` for styling, `package.json` for dependencies, `eslint.config.mjs` and `.prettierrc` for code quality).

## License

MIT
