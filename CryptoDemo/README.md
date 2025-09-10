# Crypto Currency Demo

A web application for tracking crypto currency data, news, and performing simulated trading operations. This project is the final assignment for the "Desenvolupament Web Frontend" course.

## 1. Project Overview

### 1.1. Description (En què consisteix)

_(Provide a summary of your application. What does it do? What is its main purpose?)_

### 1.2. Problem Solved (Quina necessitat resol)

_(Describe the goal of the application. For example: "This app provides a simple, clear, and user-friendly interface for users to track cryptocurrency prices and read the latest news without the clutter of professional trading platforms.")_

### 1.3. Target Audience (A quin tipus d'usuari s'adreça)

_(Who is this application for? For example: "Beginners in the crypto space, students, or anyone curious about cryptocurrency markets.")_

---

## 2. Technical Specification

### 2.1. Technologies Used

- **Languages**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **API Consumed**: [CoinGecko API](https://www.coingecko.com/en/api/documentation)
- **Tooling**:
  - Node.js & npm
  - ESLint (for code linting)
  - Prettier (for code formatting)

### 2.2. Project Structure

The project follows a modular structure to separate concerns:

- `/assets`: For static files like images and fonts.
- `/components`: For reusable UI components (e.g., CryptoList, NewsCard).
- `/pages`: For the logic of each main view (e.g., Home, News, Trade).
- `/services`: To centralize all API communication.
- `/utils`: For helper functions (e.g., date formatting, number formatting).

### 2.3. How to Run the Application

1.  **Clone the repository:**
    ```sh
    git clone <your-repo-url>
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
5.  **Open the application:**
    Open the `index.html` file in your web browser. For the best experience, use a live server extension in your code editor.

---

## 3. Development Process

### 3.1. Timeline

_(Keep a simple log of your progress here. This will help you write the final document.)_

- **Week 1 (Date):** Project setup, Tailwind configuration, initial API service to fetch data from CoinGecko, and `localStorage` management for user favorites.
- **Week 2 (Date):** ...
- **Week 3 (Date):** ...

### 3.2. Key Challenges & Solutions

_(Describe 1-2 technical problems you faced and how you solved them. For example: "Challenge: Managing application state across different pages without a framework. Solution: Implemented a simple global state object and used custom events to notify components of changes.")_

---

## 4. Project Evaluation

### 4.1. Strengths (Punts forts)

_(What works well in your project?)_

-
-

### 4.2. Weaknesses (Punts febles)

_(What could be improved?)_

-
- ***

## 5. Future Evolution

_(What features would you add next if you had more time?)_

-
- ***

## 6. References

_(If you used any significant code snippets from external sources like Stack Overflow, articles, or tutorials, list them here to give credit.)_

-
