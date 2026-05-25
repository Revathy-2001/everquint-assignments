# Max Profit Problem

## Problem Understanding

The problem is about finding the best combination of properties to maximize profit within a given time limit.

There are 3 types of properties:

| Property | Build Time | Earnings |
|----------|------------|-----------|
| Theatre | 5 units | $1500 |
| Pub | 4 units | $1000 |
| Commercial Park | 10 units | $2000 |

A property starts earning only after it has been fully developed.

Also, only one property can be developed at a time.

---

## Initial Thought Process

At first, I thought of solving this using a greedy approach by always selecting the property with the best earning efficiency.

For example:

- Theatre → 1500 / 5 = 300
- Pub → 1000 / 4 = 250
- Commercial Park → 2000 / 10 = 200

Based on this, Theatre looked like the best option.

However, after thinking through larger test cases, I realized that greedy may not always produce the maximum overall profit because:
- build order matters
- remaining operational time matters
- different combinations can produce better results

So instead of relying on local optimization, I decided to evaluate all valid combinations.

---

## Final Approach

I used a brute-force combination approach using 3 nested loops:

- one loop for Theatre count
- one loop for Pub count
- one loop for Commercial Park count

For every valid combination:
1. Total construction time is calculated
2. Invalid combinations are skipped
3. Profit is calculated based on remaining operational time after each build
4. Maximum profit is tracked

This guarantees the correct answer for all test cases.

---

## Time Complexity

The solution uses 3 nested loops:

O(n³)

This is acceptable for the given problem constraints since the number of building types is small.

---

## Sample Outputs

### Input: 7

Maximum Profit: 3000

T: 1 P: 0 C: 0

---

### Input: 8

Maximum Profit: 4500

T: 1 P: 0 C: 0

---

### Input: 13

Maximum Profit: 16500

T: 2 P: 0 C: 0

---

## Learning

This problem helped me understand the difference between:
- greedy optimization
- exhaustive combination checking

It also improved my understanding of:
- brute force problem solving
- profit optimization
- handling edge cases