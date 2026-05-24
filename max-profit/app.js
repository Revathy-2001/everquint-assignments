const BUILDINGS = [
  { key: "T", name: "Theatre", buildTime: 5, rate: 1500 },
  { key: "P", name: "Pub", buildTime: 4, rate: 1000 },
  { key: "C", name: "Commercial Park", buildTime: 10, rate: 3000 },
];

function formatMoney(amount) {
  return `$${amount.toLocaleString("en-US")}`;
}

function solveMaxProfit(n) {
  const dp = new Array(n + 1).fill(-1);
  const parent = new Array(n + 1).fill(null);
  dp[0] = 0;

  for (let t = 0; t <= n; t += 1) {
    if (dp[t] < 0) continue;

    for (const b of BUILDINGS) {
      const finish = t + b.buildTime;
      if (finish > n) continue;

      const gain = b.rate * (n - finish);
      const next = dp[t] + gain;

      if (next > dp[finish]) {
        dp[finish] = next;
        parent[finish] = { prevTime: t, building: b };
      }
    }
  }

  let bestEarnings = 0;
  for (let t = 0; t <= n; t += 1) {
    if (dp[t] > bestEarnings) bestEarnings = dp[t];
  }

  const allEndTimes = [];
  for (let t = 0; t <= n; t += 1) {
    if (dp[t] === bestEarnings) allEndTimes.push(t);
  }

  const plans = allEndTimes.map((endTime) => reconstructPlan(parent, endTime));
  return { maxEarnings: bestEarnings, plans: dedupePlans(plans) };
}

function reconstructPlan(parent, endTime) {
  const sequence = [];
  let t = endTime;

  while (parent[t]) {
    const { building, prevTime } = parent[t];
    sequence.push(building.key);
    t = prevTime;
  }

  sequence.reverse();

  const counts = { T: 0, P: 0, C: 0 };
  for (const key of sequence) counts[key] += 1;

  return { counts, sequence };
}

function planKey(plan) {
  return `T:${plan.counts.T},P:${plan.counts.P},C:${plan.counts.C}`;
}

function dedupePlans(plans) {
  const seen = new Set();
  const out = [];

  for (const plan of plans) {
    const key = planKey(plan);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(plan);
  }

  return out;
}

function run() {
  const input = document.getElementById("time-input");
  const errorEl = document.getElementById("error-msg");
  const resultPanel = document.getElementById("result-panel");
  const earningsEl = document.getElementById("max-earnings");
  const solutionsEl = document.getElementById("solutions");

  errorEl.hidden = true;

  const raw = input.value.trim();
  const n = Number(raw);

  if (!Number.isInteger(n) || n < 0) {
    errorEl.textContent = "Enter a non-negative whole number for n.";
    errorEl.hidden = false;
    resultPanel.hidden = true;
    return;
  }

  const { maxEarnings, plans } = solveMaxProfit(n);

  earningsEl.textContent = formatMoney(maxEarnings);
  resultPanel.hidden = false;

  if (plans.length === 0 || maxEarnings === 0) {
    solutionsEl.innerHTML =
      '<p class="hint">No buildings fit in this time — earnings are $0. (T: 0, P: 0, C: 0)</p>';
    return;
  }

  const list = document.createElement("ol");
  list.className = "solution-list";

  plans.forEach((plan, index) => {
    const li = document.createElement("li");
    const { T, P, C } = plan.counts;
    li.innerHTML = `<span class="label">Solution ${index + 1}:</span> T: ${T}, P: ${P}, C: ${C}`;
    list.appendChild(li);
  });

  solutionsEl.innerHTML = "";
  if (plans.length > 1) {
    const note = document.createElement("p");
    note.className = "hint";
    note.textContent = `${plans.length} optimal plans with the same maximum earnings:`;
    solutionsEl.appendChild(note);
  }
  solutionsEl.appendChild(list);
}

document.getElementById("compute-btn").addEventListener("click", run);
document.getElementById("time-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") run();
});

run();
