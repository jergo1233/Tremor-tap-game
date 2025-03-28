
function startGame() {
    let score = 0;
    let timeLeft = parseInt(document.getElementById('timer-input').value, 10);
    let highScore = localStorage.getItem('highScore') || 0;
    let gameRunning = false;
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const clickArea = document.getElementById('click-area');
    const highScoreDisplay = document.getElementById('high-score');
    const startStopButton = document.getElementById('start-stop-button');
    const timerInput = document.getElementById('timer-input');
    const setTimerButton = document.getElementById('set-timer-button');
    const reminderButton = document.getElementById('reminder-button');
    const reminderText = document.getElementById('reminder-text');

    highScoreDisplay.textContent = `High Score: ${highScore}`;
    timerDisplay.textContent = `Time: ${timeLeft}`;

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function updateTimer() {
        timerDisplay.textContent = `Time: ${timeLeft}`;
    }

    function handleClick() {
        if (gameRunning) {
            score++;
            updateScore();
        }
    }

    function countdown() {
        if (timeLeft > 0 && gameRunning) {
            timeLeft--;
            updateTimer();
            setTimeout(countdown, 1000);
        } else if (timeLeft === 0 && gameRunning) {
            gameRunning = false;
            clickArea.removeEventListener('click', handleClick);
            clickArea.textContent = "Game Over!";
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                highScoreDisplay.textContent = `High Score: ${highScore}`;
            }
            startStopButton.textContent = "Restart";
        }
    }

    function toggleGame() {
        if (!gameRunning) {
            gameRunning = true;
            score = 0;
            timeLeft = parseInt(timerInput.value, 10);
            updateScore();
            updateTimer();
            clickArea.textContent = "CLICK ME!";
            clickArea.addEventListener('click', handleClick);
            countdown();
            startStopButton.textContent = "Stop";
        } else {
            gameRunning = false;
            clickArea.removeEventListener('click', handleClick);
            startStopButton.textContent = "Start";
        }
    }

    function setGameTimer() {
        const newTime = parseInt(timerInput.value, 10);
        if (!isNaN(newTime) && newTime > 0) {
            timeLeft = newTime;
            timerDisplay.textContent = `Time: ${timeLeft}`;
        } else {
            alert("Please enter a valid positive number for the timer.");
        }
    }

    reminderButton.addEventListener('click', function() {
        reminderText.style.display = reminderText.style.display === 'block' ? 'none' : 'block';
    });

    setTimerButton.addEventListener('click', setGameTimer);
    startStopButton.addEventListener('click', toggleGame);
}

startGame();
