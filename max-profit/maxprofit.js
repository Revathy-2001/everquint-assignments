function maxProfit(n) {

    let maxProfit = 0;

    let bestT = 0;
    let bestP = 0;
    let bestC = 0;

    for (let t = 0; t <= Math.floor(n / 5); t++) {

        for (let p = 0; p <= Math.floor(n / 4); p++) {

            for (let c = 0; c <= Math.floor(n / 10); c++) {

                let totalTime =
                    (t * 5) +
                    (p * 4) +
                    (c * 10);

                if (totalTime > n) {
                    continue;
                }

                let currentTime = n;
                let profit = 0;

                // Building Theatres
                for (let i = 0; i < t; i++) {
                    currentTime -= 5;
                    profit += currentTime * 1500;
                }

                // Building Pubs
                for (let i = 0; i < p; i++) {
                    currentTime -= 4;
                    profit += currentTime * 1000;
                }

                // Building Commercial Parks
                for (let i = 0; i < c; i++) {
                    currentTime -= 10;
                    profit += currentTime * 2000;
                }

                if (profit > maxProfit) {

                    maxProfit = profit;

                    bestT = t;
                    bestP = p;
                    bestC = c;
                }
            }
        }
    }

    console.log("Maximum Profit:", maxProfit);

    console.log(
        `T: ${bestT} P: ${bestP} C: ${bestC}`
    );
}



maxProfit(7);
maxProfit(8);
maxProfit(13);
maxProfit(49);