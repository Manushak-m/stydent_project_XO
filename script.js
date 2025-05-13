document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    document.getElementById('restart').addEventListener('click', initGame);
});

function initGame() {
    const gameBoard = document.getElementById('game');
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        block.dataset.index = i;
        gameBoard.appendChild(block);
    }
    
    let hod = 0;
    let gameOver = false;
    
    gameBoard.onclick = function(event) {
        if (gameOver) return;
        
        const target = event.target;
        if (target.className === 'block' && !target.innerHTML) {
                target.innerHTML = 'X';
                target.classList.add('x');
                hod++;
            //haxtoxi stugum
            const winner = checkWinner();
            if (winner) {
                gameOver = true;
                setTimeout(() => {
                    if (winner === 'draw') {
                        alert('Խաղն ավարտվեց ոչ-ոքի!');
                    } else {
                        alert(`"${winner}"-երը հաղթեցին!`);
                    }
                }, 100);
                return;
            }
            //hamakargichn e qail anum
             if (!gameOver) {
                setTimeout(() => {
                    makeAIMove();
                    
                    const winner = checkWinner();
                    if (winner) {
                        gameOver = true;
                        setTimeout(() => {
                            if (winner === 'draw') {
                                alert('Խաղն ավարտվեց ոչ-ոքի!');
                            } else {
                                alert(`"${winner}"-ները հաղթեցին!`);
                            }
                        }, 100);
                    }
                }, 500);//0-in mtacelu jamanak

                hod++
        }
    };
}

    // hamakargchi qayli hamar funkcia
    function makeAIMove() {
        const blocks = document.getElementsByClassName('block');
        const board = Array.from(blocks).map(block => block.innerHTML);
        
        //haxtelu havanakanutyun
        const winMove = findWinningMove(board, 'o');
        if (winMove !== -1) {
            blocks[winMove].innerHTML = 'o';
            blocks[winMove].classList.add('o');
            return;
        }
        
        //argelq
        const blockMove = findWinningMove(board, 'X');
        if (blockMove !== -1) {
            blocks[blockMove].innerHTML = 'o';
            blocks[blockMove].classList.add('o');
            return;
        }
        
        //kentronum texakayum
        if (!board[4]) {
            blocks[4].innerHTML = 'o';
            blocks[4].classList.add('o');
            return;
        }
        
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => !board[corner]);
        if (availableCorners.length > 0) {
            const randomCorner = availableCorners[Math.floor(Math.random() * availableCorners.length)];
            blocks[randomCorner].innerHTML = 'o';
            blocks[randomCorner].classList.add('o');
            return;
        }
        
        const availableMoves = board.map((cell, index) => !cell ? index : null).filter(index => index !== null);
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            blocks[randomMove].innerHTML = 'o';
            blocks[randomMove].classList.add('o');
        }
    }
    
    function findWinningMove(board, symbol) {
        const patterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const pattern of patterns) {
            const [a, b, c] = pattern;
            
            if (board[a] === symbol && board[b] === symbol && !board[c]) {
                return c;
            }
            if (board[a] === symbol && !board[b] && board[c] === symbol) {
                return b;
            }
            if (!board[a] && board[b] === symbol && board[c] === symbol) {
                return a;
            }
        }
        
        return -1;
    }
}

function checkWinner() {
    const blocks = document.getElementsByClassName('block');
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (const pattern of patterns) {
        const [a, b, c] = pattern;
        if (blocks[a].innerHTML && 
            blocks[a].innerHTML === blocks[b].innerHTML && 
            blocks[a].innerHTML === blocks[c].innerHTML) {
            
            blocks[a].style.backgroundColor = '#2ecc71';
            blocks[b].style.backgroundColor = '#2ecc71';
            blocks[c].style.backgroundColor = '#2ecc71';
            
            return blocks[a].innerHTML;
        }
    }
    
    let isDraw = true;
    for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].innerHTML) {
            isDraw = false;
            break;
        }
    }
    
    if (isDraw) return 'draw';
    return null;
}