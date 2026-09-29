# Modern Glassmorphic Calculator

A stylish, interactive, and responsive web calculator built using modern HTML5, CSS3, and JavaScript. It features a dark glassmorphism aesthetic, dual-line display, floating-point error correction, and full keyboard navigation support.

---

## ✨ Features

- **Glassmorphism UI**: Frosted-glass container with subtle glow accents, hover effects, and tactile button animations.
- **Dual Display**: 
  - Top line shows the full ongoing expression.
  - Main display shows the current input or calculated result.
- **Smart Logic**:
  - **Clear All (`AC`)** and **Backspace (`⌫`)** controls.
  - Auto-fixes floating-point arithmetic precision errors (e.g., `0.1 + 0.2 = 0.3`).
  - Error handling for invalid expressions or division by zero.
- **Full Physical Keyboard Support**:
  - Number keys (`0-9`) & Decimal (`.`)
  - Arithmetic operators (`+`, `-`, `*`, `/`, `%`)
  - `Enter` or `=` to evaluate
  - `Backspace` to delete the last character
  - `Escape` to clear everything

---

## 📁 File Structure

Place all three files in the same directory:

```text
calculator-project/
├── index.html        # Page structure & semantic layout
├── calculator.css    # Modern glassmorphism styling & animations
├── calculator.js     # Calculation state, evaluation, & keyboard listeners
└── README.md         # Project documentation