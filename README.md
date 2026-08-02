# 🚀 GitHub Profile Analyzer

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

A sleek, highly responsive web application that fetches and visualizes GitHub user data in real-time. Built with a mobile-first approach, this tool allows users to seamlessly search for any GitHub profile and instantly view their statistics, repositories, and social presence.

🔴 **Live Demo:** <a href="https://github-profile-analyzer-delta.vercel.app/" target="_blank" rel="noopener noreferrer">GitHub Profile Analyzer on Vercel</a>

---

## 📸 Preview
<p align="center">
  <img width="48%" height="906" alt="Mobile Preview" src="https://github.com/user-attachments/assets/7ba3de6a-e77e-43bd-b345-77a990724a85" />
  <img width="48%" height="906" alt="Search Results" src="https://github.com/user-attachments/assets/96e0142e-eb6e-4849-bb1f-05440a82b3c5" />
</p>

## 🎯 Why I Built This

I created this project primarily as a hands-on exercise to practice and sharpen my core frontend development skills. My main objectives were:

* **Improving Logical Thinking & Build Logic:** Challenging myself to structure application flow, handle edge cases (like invalid user inputs), and write clean, efficient JavaScript logic.
* **Fetching API Data with Axios:** Learning to effectively request, parse, and handle real-world data from the GitHub REST API using asynchronous JavaScript (`async/await`).
* **Dynamic DOM Manipulation:** Strengthening my command over Vanilla JS to dynamically render and update the UI based on fetched data, without relying on heavy frameworks.
* **Tailwind CSS:** Improving my ability to build clean, mobile-responsive layouts rapidly.

*Note: This is a purely frontend application focused on UI logic and third-party API consumption; there is no backend server or database involved.*

## ✨ Key Features

* **Real-Time Data Fetching:** Utilizes the public GitHub REST API and Axios to retrieve user profiles dynamically.
* **Comprehensive Dashboard:** Displays core metrics including Followers, Following, Repositories, and active stars.
* **Mobile-Optimized UX:** 
  * Fully responsive grid layout that gracefully transitions from mobile (stacked) to desktop (single-line) views.
  * **Auto-Blur Input:** Automatically dismisses the mobile keyboard upon search submission for an uninterrupted user experience.
* **Robust Error Handling:** Alerts users cleanly for `404 Not Found` errors (invalid usernames) and API rate-limit triggers.
* **Modern UI:** Crafted using Tailwind CSS and inline SVGs for a lightweight, modern, and clean aesthetic.

---

## 🛠️ Tech Stack

* **Frontend UI:** HTML5, Tailwind CSS
* **Logic & API:** Vanilla JavaScript (ES6+), `async/await`, Axios
* **Bundler:** Vite
* **Deployment:** Vercel

---

## 💻 Local Run & Installation

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/tanmayyee/github-profile-analyzer.git](https://github.com/tanmayyee/github-profile-analyzer.git)
   cd github-profile-analyzer

2. **Install the dependencies:**
   npm install

4. **Start the development server:**   
   npm run dev
   
5. **Open in Browser:**
Navigate to http://localhost:5173 (or the port provided in your terminal).

📊 Project Status
Status: Completed & Deployed ✅

This project is currently fully functional and live in a production environment via Vercel. The core objectives—including real-time API integration, dynamic DOM manipulation, and responsive UI/UX design—have been successfully achieved.

However, this is an ongoing journey! I may add more features and overall improvements in the future, such as:

Caching recent searches using browser localStorage.

Implementing a system-wide Dark/Light theme toggle.
 
## 👤 Author

**Tanmay Johri**
A passionate Full-Stack MERN developer crafting clean and efficient web applications.
* [GitHub](https://github.com/tanmayyee) · [LinkedIn](https://www.linkedin.com/in/tanmayjohri/)

## 📄 License

MIT
