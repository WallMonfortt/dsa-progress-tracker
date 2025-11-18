# DSA Progress Tracker 🚀

A personalized dashboard to supercharge my Data Structures & Algorithms practice for technical interviews.

---

## 🔥 About The Project

This is my personal version of a tool designed to track progress on coding platforms like NeetCode and LeetCode. While it began as a fork, it is now evolving to include specific features tailored to my study routine and interview preparation goals.

The objective is to create an all-in-one tool that not only logs solved problems but also facilitates active recall and helps identify areas for improvement.

### 🛠️ Built With

* [Vite](https://vitejs.dev/) - Build tool and development server
* [React](https://reactjs.org/) - UI library
* [React Router](https://reactrouter.com/) - Routing
* [Tailwind CSS](https://tailwindcss.com/) - Styling
* [Lucide React](https://lucide.dev/) - Icons

---

## ✨ Key Features

* ✅ **Visual Tracking:** Log completed problems across various categories (Arrays, Graphs, DP, etc.).
* ✅ **Spaced Repetition System:** Automatic scheduling of review dates (3, 5, 9, 17, 33, 65 days) to optimize long-term retention.
* ✅ **Automatic Sync:** Progress is saved automatically to the browser's local storage.
* ✅ **Custom Problems:** Add your own problems to track beyond the NeetCode 150 list.
* ✅ **Export/Import:** Backup and restore your progress data.
* ✅ **Dark Mode:** Full dark mode support for comfortable late-night coding sessions.
* ✅ **Progress Statistics:** Track your progress with detailed stats (total solved, by difficulty, due today).
* ✅ **Filtering & Search:** Filter by category, difficulty, or search by name/ID.
* ✅ **Multiple Roadmaps:** Access to different learning paths (Fundamentos, Patterns, Interview Roadmap).
* ✏️ **Note-Taking System (Planned):** A dedicated section for each problem to add personal notes, time/space complexity (Big O), and solution approaches.
* ⏱️ **Practice Timer (Planned):** A feature to time problem-solving sessions, simulating real interview conditions.
* 🏷️ **Custom Tags (Planned):** A system to tag problems with labels like "Review in 7 days," "Tricky," or "Favorite."

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

Ensure you have Node.js (v16 or higher) installed on your machine.

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/WallMonfortt/dsa-progress-tracker.git
    ```
2.  Navigate to the project directory
    ```sh
    cd dsa-progress-tracker
    ```
3.  Install dependencies
    ```sh
    # Using npm
    npm install

    # Or using pnpm (recommended - faster and more efficient)
    pnpm install
    ```
4.  Start the development server
    ```sh
    # With npm
    npm run dev

    # Or with pnpm
    pnpm dev
    ```
5.  Open [http://localhost:5173](http://localhost:5173) in your browser to see the result!

### Available Scripts

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run preview` - Preview production build
* `npm run lint` - Run ESLint

---

## 🗺️ Roadmap

* [x] Move to Complete SDE guide
* [x] Add tools section
* [x] Implement spaced repetition system
* [x] Add custom problems functionality
* [x] Export/Import data feature
* [ ] Complete Fundamentos page content
* [ ] Translate entire application to Spanish
* [ ] Create guides for each topic
* [ ] Implement note-taking system for problems
* [ ] Add practice timer feature
* [ ] Add custom tags system
* [ ] Refactor project structure
* [ ] Add unit tests for components
* [ ] Extract reusable components to shared library
* [ ] Extract color palette and theme to shared library
* [ ] Implement internationalization (i18n)
* [ ] See or add [Issues](https://github.com/WallMonfortt/dsa-progress-tracker/issues) for a full list of proposed features (and known issues).

## 📁 Project Structure

```
src/
├── components/       # Reusable React components
│   ├── buttons/     # Button components
│   ├── sections/    # Section components
│   └── table/       # Table-related components
├── contexts/        # React contexts (Theme)
├── data/            # JSON data files (problems, topics, etc.)
├── hooks/           # Custom React hooks
├── pages/           # Page components (routes)
├── utils/           # Utility functions
└── assets/          # Static assets (icons, images)
```

## 📄 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## 🙏 Acknowledgements (Important!)

I want to extend a special thanks to **Javlonbek Kosimov ([javydevx](https://github.com/javydevx))** for his incredible work in creating the original project, [neetcode-tracker](https://github.com/javydevx/neetcode-tracker).

This project would not be possible without his foundational codebase, which served as the primary inspiration and starting point for this new version. If you find this tool helpful, please consider visiting the original repository to give it a star. ⭐