const CELL = 28;
const GAP = 2;

const BLOCK_FILL = "#f5c518";
const WATER_FILL = "#3b82f6";
const EMPTY_FILL = "#eef1f5";
const GRID_STROKE = "#d1d5db";

/**
 * Trapping rain water — O(n) two-pointer.
 * @param {number[]} height
 * @returns {number}
 */
function totalTrappedWater(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] <= height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      total += leftMax - height[left];
      left += 1;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      total += rightMax - height[right];
      right -= 1;
    }
  }

  return total;
}

/**
 * Per-column water depth (for visualization).
 * @param {number[]} height
 * @returns {number[]}
 */
function waterPerColumn(height) {
  const n = height.length;
  if (n === 0) return [];

  const leftMax = new Array(n);
  const rightMax = new Array(n);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i += 1) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i -= 1) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  return height.map((h, i) => Math.max(0, Math.min(leftMax[i], rightMax[i]) - h));
}

function parseHeights(raw) {
  const trimmed = raw.trim();
  if (!trimmed) throw new Error("Please enter at least one height.");

  const parts = trimmed.split(/[\s,]+/).filter(Boolean);
  const heights = parts.map((part, index) => {
    const value = Number(part);
    if (!Number.isFinite(value) || value < 0 || !Number.isInteger(value)) {
      throw new Error(`Invalid value "${part}" at position ${index + 1}. Use non-negative integers.`);
    }
    return value;
  });

  return heights;
}

function renderChart(container, height, water, mode) {
  container.innerHTML = "";

  if (height.length === 0) {
    container.classList.add("chart-empty");
    container.textContent = "No data to display.";
    return;
  }

  container.classList.remove("chart-empty");

  const maxLevel = Math.max(1, ...height, ...water.map((w, i) => height[i] + w));
  const cols = height.length;
  const width = cols * (CELL + GAP) + GAP;
  const heightPx = maxLevel * (CELL + GAP) + GAP;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(heightPx));
  svg.setAttribute("role", "img");

  for (let col = 0; col < cols; col += 1) {
    const x = GAP + col * (CELL + GAP);
    const blockH = height[col];
    const waterH = water[col];

    for (let row = 0; row < maxLevel; row += 1) {
      const levelFromBottom = maxLevel - row;
      const y = GAP + row * (CELL + GAP);

      let fill = EMPTY_FILL;
      if (mode === "combined") {
        if (levelFromBottom <= blockH) fill = BLOCK_FILL;
        else if (levelFromBottom <= blockH + waterH) fill = WATER_FILL;
      } else if (mode === "water-only" && levelFromBottom <= waterH) {
        fill = WATER_FILL;
      }

      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", String(x));
      rect.setAttribute("y", String(y));
      rect.setAttribute("width", String(CELL));
      rect.setAttribute("height", String(CELL));
      rect.setAttribute("fill", fill);
      rect.setAttribute("stroke", GRID_STROKE);
      rect.setAttribute("stroke-width", "1");
      svg.appendChild(rect);
    }
  }

  container.appendChild(svg);
}

function run() {
  const input = document.getElementById("heights-input");
  const errorEl = document.getElementById("error-msg");
  const totalEl = document.getElementById("total-water");
  const inputChart = document.getElementById("input-chart");
  const waterChart = document.getElementById("water-chart");

  errorEl.hidden = true;

  try {
    const heights = parseHeights(input.value);
    const water = waterPerColumn(heights);
    const total = totalTrappedWater(heights);

    totalEl.textContent = `${total} unit${total === 1 ? "" : "s"}`;
    renderChart(inputChart, heights, water, "combined");
    renderChart(waterChart, heights, water, "water-only");
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.hidden = false;
    totalEl.textContent = "—";
    inputChart.innerHTML = "";
    waterChart.innerHTML = "";
  }
}

document.getElementById("compute-btn").addEventListener("click", run);
document.getElementById("heights-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") run();
});

run();
