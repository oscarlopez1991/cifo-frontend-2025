# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Created `utils/storageService.js` to manage favorite cryptocurrencies in `localStorage`.
- Created `services/cryptoService.js` to fetch market chart data from the CoinGecko API for favorite coins.
- Updated `main.js` to fetch and log data on page load.

### Changed

-

### Fixed

- Added a default favicon link in `index.html` to prevent 404 errors.

---

## [1.0.0] - 2025-09-08

### Added

- Initial project setup with a modular folder structure.
- Configured Tailwind CSS for styling.
- Set up ESLint and Prettier for code quality.
- Created initial `index.html`, `main.js`, and `style.css` files.
- Added `.gitignore` to exclude unnecessary files.
- Created `README.md` and `CHANGELOG.md` for project documentation.
