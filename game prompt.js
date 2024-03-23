document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("section:nth-of-type(2)").style.display = "none";

    function startGame() {
        document.querySelector("section:nth-of-type(2)").style.display = "block";
        const randomNumber = Math.floor(Math.random() * 11);
        let attempts = 0;
        document.querySelector("input[value='Guess']").addEventListener("click", function() {
            const playerGuess = parseInt(document.querySelector("input[type='number']").value);
            const advice = document.querySelector("#advice");
            if (playerGuess === randomNumber) {
                const playerName = document.querySelector("input[type='text']").value;
                updateLeaderboard(playerName, attempts);
                alert(`Congratulations ${playerName}! You've guessed the right number in ${attempts} attempts.`);
                document.querySelector("input[type='number']").value = "";
                document.querySelector("section:nth-of-type(2)").style.display = "none"; 
                document.querySelector("input[type='text']").value = ""; 
            } else {
                attempts++;
                advice.textContent = playerGuess < randomNumber ? "Too low" : "Too high";
            }
        });
    }

    function updateLeaderboard(playerName, score) {
        const leaderboardTable = document.querySelector("tbody");
        const newRow = document.createElement("tr");
        newRow.innerHTML = `<td>${leaderboardTable.children.length + 1}</td>
                            <td>${playerName}</td>
                            <td>${score}</td>`;
        let inserted = false;
        for (let i = 0; i < leaderboardTable.children.length; i++) {
            const row = leaderboardTable.children[i];
            const rowScore = parseInt(row.children[2].textContent);
            if (score < rowScore) {
                leaderboardTable.insertBefore(newRow, row);
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            leaderboardTable.appendChild(newRow);
        }
        updateRankingNumbers();
    }

    function updateRankingNumbers() {
        const leaderboardTable = document.querySelector("tbody");
        for (let i = 0; i < leaderboardTable.children.length; i++) {
            leaderboardTable.children[i].children[0].textContent = i + 1;
        }
    }

    document.querySelector("input[value='start the game']").addEventListener("click", startGame);
});