# Ever Quint — Frontend Engineer Assignments

Submission for the Ever Quint hiring assignment (Step 1).

| # | Assignment | Folder | How to run |
|---|------------|--------|------------|
| 1 | Team Workflow Board | [team-workflow-board](https://github.com/Revathy-2001/team-workflow-board) | See that repo’s README (`npm install` && `npm run dev`) |
| 2 | Water Tank (trapped rain water) | [`water-tank/`](./water-tank/) | Open `water-tank/index.html` in a browser |
| 3 | Max Profit (building schedule) | [`max-profit/`](./max-profit/) | Run using `node solution.js` |

---

## Assignment 2 — Water Tank

- Enter comma-separated block heights (e.g. `0,4,0,0,0,6,0,6,4,0`)
- Computes trapped water using the two-pointer approach
- SVG visualization:
  - Yellow = terrain
  - Blue = trapped water

---

## Assignment 3 — Max Profit

- Calculates the maximum possible earnings based on the given time units `n`
- Evaluates all valid combinations of:
  - Theatre
  - Pub
  - Commercial Park
- Uses exhaustive combination checking to guarantee the optimal result
- Displays:
  - maximum profit
  - Theatre count (`T`)
  - Pub count (`P`)
  - Commercial Park count (`C`)
- Verified examples:
  - `n=7` → $3,000
  - `n=8` → $4,500
  - `n=13` → $16,500
  - `n=49` → $324,000

---

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- Node.js for running the Max Profit solution
