<div align="center">
  <img src="./public/vite.svg" alt="TapSnap Logo" width="120" />
  
  # ⚡ TapSnap

  **A fast-paced, reflex-based matching game built with React, Tauri, and Go.**

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://imgshields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=white" alt="Tauri" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </p>
</div>

---

## 🌟 Overview

**TapSnap** is an engaging desktop reflex game designed to test your hand-eye coordination. Players interact with abstract shapes horizontally scrolling and falling down the screen, aiming for the **perfect snap** overlay. 

Powered by **Tauri** for seamless desktop performance and utilizing a **Go Sidecar** for backend metrics and persistence via SQLite, TapSnap offers a highly responsive and fluid gameplay experience!

## 🚀 Features

- 🎮 **Dynamic Game Loop**: Smooth 60FPS animation updates utilizing optimized `requestAnimationFrame`.
- 🕹️ **Matching Mechanics**: Complex object alignment, shape rotation tracking, and precise overlap calculations.
- 🎨 **Visual Flourishes**: Stunning visual feedback, including screen flashes and canvas-based confetti celebrations for perfect hits!
- 🗄️ **Local Persistence**: Secure SQLite tracking of your high scores, progression, and unlocked levels via our integrated Go Sidecar.
- 📱 **Responsive UI**: "Zomato-style" clean interface designs with polished Level Selection screens.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, TypeScript, and Vite.
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4 & Lucide React Icons.
- **Desktop Interop**: Tauri v2 IPC Bridge.
- **Backend / Database**: Go (Golang) compiled sidecar with SQLite.

---

## 💻 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install) (for Tauri)
- [Go](https://go.dev/) (for building the sidecar)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TapSnap.git
   cd TapSnap
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server natively (Web View):**
   ```bash
   npm run dev
   ```

4. **Launch the Tauri Desktop app:**
   ```bash
   npm run tauri dev
   ```

---

## 🏗️ Architecture Architecture & WBS

Check out our [WBS.md](./WBS.md) for a detailed roadmap of the project's development phases.

### Directory Structure
- `/src/` — React frontend components, screens, and game loop logic.
- `/src-tauri/` — Rust boilerplate and Tauri configurations.
- `/sidecar/` — Go backend executables and SQLite handling.
- `/tapsnap-info-website/` — Project landing profile and policy pages.

---

<div align="center">
  Crafted with ❤️ by the TapSnap Team.
</div>
