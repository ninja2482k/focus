# Focus Me

**Focus Me** is a gamified productivity web app designed to make staying focused fun. It combines the Pomodoro technique with XP tracking, daily heatmaps, and customizable sessions to help you build discipline and achieve deep work goals.

---

## 🚀 Features

- 🎯 **Customizable Focus Timers** – Choose your own session and break durations.
- 🧠 **XP System** – Earn experience points by staying focused and completing sessions.
- 🔥 **Heatmaps** – Visualize your productivity patterns over days or weeks.
- ✨ **Motivational Quotes** – Stay inspired with rotating motivational messages.
- 🎨 **Personal Settings** – Adjust focus goals, timer lengths, and XP targets.
- 🛠️ **Component-based Layout** – Modular design for easier customization.

---

## 📁 Project Structure

```
focus/
├── components/              # Reusable HTML components (e.g., header, footer, modals)
├── dashboard.html           # Main productivity dashboard with timer and stats
├── index.html               # Landing page or login/signup
├── settings.html            # User settings and configuration interface
├── forgot-password.html     # Password recovery
├── reset-password.html      # Password reset page
├── script.js                # Core JavaScript logic (timers, XP, heatmaps)
└── style.css                # Centralized styling
```

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ninja2482k/focus.git
   cd focus
   ```

2. **Run the app**
   - Open `index.html` in a web browser to begin.
   - No additional build steps required.

3. *(Optional)* Use a simple local server for smoother file loading:
   ```bash
   # Using Python 3
   python -m http.server
   ```

---

## 🛠️ Configuration Guide

- Personalize your experience by visiting `settings.html`.
- You can modify:
  - Focus duration
  - Break times
  - XP targets per session
  - UI themes (coming soon)
- No backend configuration is currently required.

---

## 🔧 Recent Improvements & Refactoring

- ✅ Extracted reusable components to the `components/` folder for modularity.
- ✅ Centralized styles in `style.css`.
- ✅ Refactored `script.js` to separate event listeners, logic handlers, and utility functions.
- ✅ Improved semantic HTML usage and accessibility.

---

## 💡 Technologies Used

- **Languages**: HTML5, CSS3, JavaScript (ES6)
- **APIs**: None (Vanilla JS, all frontend)
- **Tools**: LocalStorage (for session data), basic modular structure

---

## 🧠 How the Code Works

1. **Session Logic**: `script.js` defines timers and logic for focus/break intervals.
2. **XP Handling**: Earned based on completed focus intervals; XP is saved via LocalStorage.
3. **UI Interactions**: DOM elements update based on timer state (e.g., start, pause, reset).
4. **Heatmap Generation**: Generates a visual history of focus sessions over time.
5. **Component Reuse**: `components/` includes shared HTML (header, footer, modal) for DRY structure.

---

## 🤝 Contributing

We welcome contributions! Follow these guidelines:

1. **Fork** this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes and commit with meaningful messages.
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a Pull Request and describe your changes clearly.

### Contribution Rules

- Keep commits small and focused.
- Write clear, descriptive commit messages.
- Follow the code style used in existing files.
- Be respectful in communication—review the `CODE_OF_CONDUCT.md`.

---

## 📜 License

This project is licensed under the [MIT License](https://github.com/ninja2482k/focus/blob/main/LICENSE).

---

## 📫 Contact

Created by **Calvin Fernandes**.  
Feel free to reach out via GitHub issues or discussions on the repository!

---

## 📚 Additional Documentation

- [Code of Conduct](https://github.com/ninja2482k/focus/blob/main/CODE_OF_CONDUCT.md)
- [License](https://github.com/ninja2482k/focus/blob/main/LICENSE)
- Future documentation (API, backend integration) coming soon.

---