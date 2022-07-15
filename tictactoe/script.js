let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let boxes = document.querySelectorAll(".box");
let displayWinner = document.getElementById('winner');
let board = document.getElementById('board');
let reset = document.getElementById('reset');
let choices = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let player = [];
let computer = [];
let winner = false;

boxes.forEach(box => {
    box.addEventListener("click", (e) => {
        //box selected by player
        let selected = e.target.getAttribute("data-id");

        //loop through choices list to eliminate item whose index matches selected
        choices.forEach((choice, i) => {
            if (selected == choice) {
                player.push(choice);
                box.setAttribute('data-selected', 'user');
                box.setAttribute('data-checked', 'true');
                console.log(box)
                box.style.pointerEvents = "none";
                box.style.backgroundColor = 'rgba(145, 229, 255, 0.5)';
                box.innerHTML = "⭕";
            };
        });

        winningCombos.map(combo => {
            if ((boxes[combo[0]].getAttribute('data-selected') == 'user') &&
                (boxes[combo[1]].getAttribute('data-selected') == 'user') &&
                (boxes[combo[2]].getAttribute('data-selected') == 'user')) {
                displayWinner.innerHTML = 'Player won! 🎉';
                board.style.pointerEvents = 'none';
                winner = true;
            }
        })

        if (winner) return false;

        //computer's turn
        let computerTurn = Math.floor(Math.random() * choices.length);


        choices.forEach((choice, i) => {
            if (computerTurn == i) {
                computer.push(choice);

                let temp = document.querySelector(`[data-id='${choice}']`);
                choices.splice(i, 1);

                temp.setAttribute('data-selected', 'computer');
                temp.setAttribute('data-checked', 'true');

                temp.style.backgroundColor = 'rgba(255, 248, 184, 0.5)';
                temp.style.pointerEvents = 'none';
                temp.innerHTML = "❌";
            };
        });


        winningCombos.forEach(combo => {
            if ((boxes[combo[0]].getAttribute('data-selected') == 'computer') &&
                (boxes[combo[1]].getAttribute('data-selected') == 'computer') &&
                (boxes[combo[2]].getAttribute('data-selected') == 'computer')) {
                displayWinner.innerHTML = 'Computer won! 🤖';
                board.style.pointerEvents = 'none';
                winner = true;
            }
        })

        if (winner) return false;

        if (choices.length == 0) {
            if (winner == false) {
                displayWinner.innerHTML = 'It\'s a tie! 😑';
            }
        }
    });
});

reset.addEventListener('click', e => {
    window.location.reload();
})