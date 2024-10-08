document.addEventListener('DOMContentLoaded', () => {
    const chessBoard = document.querySelector('.chess-board');
    const rematchButton = document.getElementById('rematch');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    let selectedSquare = null;
    let darkMode = false;

    const pieces = {
        'P': '&#9817;', // white pawn
        'R': '&#9814;', // white rook
        'N': '&#9816;', // white knight
        'B': '&#9815;', // white bishop
        'Q': '&#9813;', // white queen
        'K': '&#9812;', // white king
        'p': '&#9823;', // black pawn
        'r': '&#9820;', // black rook
        'n': '&#9822;', // black knight
        'b': '&#9821;', // black bishop
        'q': '&#9819;', // black queen
        'k': '&#9818;', // black king
    };

    function createBoard() {
        const boardLayout = [
            'rnbqkbnr',
            'pppppppp',
            '        ',
            '        ',
            '        ',
            '        ',
            'PPPPPPPP',
            'RNBQKBNR',
        ];

        chessBoard.innerHTML = '';
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('chess-square');
                square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                square.dataset.row = row;
                square.dataset.col = col;
                const piece = boardLayout[row][col];
                if (piece !== ' ') {
                    square.innerHTML = pieces[piece];
                }
                square.addEventListener('click', handleSquareClick);
                chessBoard.appendChild(square);
            }
        }
    }

    function handleSquareClick(event) {
        const clickedSquare = event.target;

        // If a piece is already selected
        if (selectedSquare) {
            movePiece(selectedSquare, clickedSquare);
            selectedSquare.classList.remove('selected');
            selectedSquare = null;
        } else {
            // If a piece is selected for the first time
            if (clickedSquare.innerHTML !== '') {
                selectedSquare = clickedSquare;
                selectedSquare.classList.add('selected');
            }
        }
    }

    function movePiece(fromSquare, toSquare) {
        // Move the piece to the new square
        toSquare.innerHTML = fromSquare.innerHTML;
        fromSquare.innerHTML = '';
    }

    rematchButton.addEventListener('click', () => {
        createBoard();
    });

    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    createBoard();
});
