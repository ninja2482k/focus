# 🎯 Focus Me

**Focus Me** is a gamified productivity tool designed to help users stay focused using customizable timers, XP-based motivation, and visual progress tracking. Built entirely with HTML, CSS, and JavaScript, it's perfect for anyone looking to build discipline through consistent work sessions.

---

## ✨ Features

- ⏱️ Customizable Pomodoro-style timer system (work and break sessions)
- 🧠 XP System to track progress and reward consistency
- 📊 Productivity heatmap to visualize daily performance
- 🎨 Personal settings page for session length, XP values, and themes
- 💾 Local storage for saving user progress across sessions
- 📱 Fully frontend – no server or database required


## 🗂️ Project Structure

```
focus/
├── components/              # Reusable UI snippets like headers, modals, and overlays shared across pages
├── dashboard.html           # Main user interface with the timer, session controls, XP display, and productivity stats
├── index.html               # Landing or entry page; typically the first page users see before starting a session
├── settings.html            # Settings page for customizing focus duration, XP rewards, themes, and other preferences
├── forgot-password.html     # Placeholder page for password recovery if authentication is implemented later
├── reset-password.html      # Placeholder for resetting a user’s password via a secure link or token (future use)
├── script.js                # Core logic for the Pomodoro timer, session transitions, XP tracking, and UI updates
├── style.css                # Main stylesheet: handles layout, color themes, responsiveness, and animations
└── docs/                    # Documentation images used in the README
```

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ninja2482k/focus.git
   cd focus
   ```

2. **Run the app locally:**
   - Open `index.html` in your browser

   - Or launch a local server (recommended):
     ```bash
     # Python 3
     python -m http.server
     ```

---

## 🛠️ Configuration Guide

The app works out of the box, but you can personalize it:

- Go to `settings.html`
- Set your preferred:
  - Focus session length
  - Break duration
  - XP gained per session
  - Color theme (feature under development)

No build tools, databases, or environment variables needed.

---

## 🔄 Recent Improvements & Refactoring

- ✅ Refactored JavaScript for modularity and better event handling
- ✅ Moved UI components into a `components/` folder for reuse
- ✅ Improved mobile responsiveness with cleaner CSS
- ✅ Separated user logic and timer logic for clarity
- ✅ Added XP system and basic heatmap visualization

---

## 🧰 Technologies Used

| Tool / Language | Purpose                     |
|-----------------|-----------------------------|
| HTML5           | Page structure               |
| CSS3            | Styling and responsive layout|
| JavaScript (ES6)| Timer, XP, and UI logic      |
| LocalStorage    | Saving user data             |

---

## 🧠 How the Code Works

1. `dashboard.html` loads the main interface.
2. `script.js` initializes the timer, sets event listeners, and controls UI state.
3. XP is awarded upon completing sessions and saved using `localStorage`.
4. Heatmap is updated daily based on session completions.
5. `settings.html` lets the user configure their productivity preferences.

---

## 🤝 Contributing

We welcome contributions!

1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes with descriptive messages.
4. Push to your fork and open a pull request.

### Contribution Guidelines

- Follow consistent code style.
- Keep commits small and focused.
- Use clear naming conventions.
- Be respectful in all communication.

Refer to the [Code of Conduct](https://github.com/ninja2482k/focus/blob/main/CODE_OF_CONDUCT.md) before contributing.

---

## 🧩 Idea Phase

<p align="center"> <img src="docs/app%20ideas%20mind%20map.png" width="350" alt="Idea Map Overview"/> <img src="docs/user%20web%20flow.png" width="350" alt="User Interaction Flow"/> </p> <p align="center"> <b>Left:</b> Idea Map Overview | <b>Right:</b> User Interaction Flow </p> <br> <p align="center"> <img src="docs/project%20overview.png" width="350" alt="Project Overview"/> <img src="docs/tool%20used.png" width="350" alt="Tools Used"/> </p> <p align="center"> <b>Left:</b> Project Overview | <b>Right:</b> Tools Used </p>

---

## 📚 Additional Documentation

- [Code of Conduct](https://github.com/ninja2482k/focus/blob/main/CODE_OF_CONDUCT.md)
- [License](https://github.com/ninja2482k/focus/blob/main/LICENSE)
- Future additions: Firebase Auth integration, Graph-based visual XP tracker

---

## 📫 Contact

Created by **Calvin Fernandes**.  
Feel free to reach out via [GitHub Issues](https://github.com/ninja2482k/focus/issues) or join the [Discussions](https://github.com/ninja2482k/focus/discussions) tab.

---

## 📜 License

Licensed under the [MIT License](https://github.com/ninja2482k/focus/blob/main/LICENSE).

---
