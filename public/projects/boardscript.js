let cvs = document.getElementById("canvas");
let cxt = cvs.getContext("2d");

let boardSize = 10;
let blockSize = cvs.width / boardSize;

let startingValues = [
	"0000000000",
	"0000000000",
	"0001002200",
	"0010102200",
	"0001100000",
	"0000022000",
	"0011020200",
	"0011002000",
	"0000000000",
	"0000000000",
];

for (let y = 0; y < boardSize; y++) {
	for (let x = 0; x < boardSize; x++) {
		let input = document.createElement("INPUT");
		input.id = x + "," + y;
		input.type = "number";
		input.max = "2";
		input.min = "0";
		input.width = "50";
		input.value = startingValues[y][x];
		document.body.insertBefore(input, document.getElementById("reset"));
	}
	document.body.insertBefore(
		document.createElement("BR"),
		document.getElementById("reset")
	);
}

let board;
let moves = new Array(2);
let plays = new Array(2);
for (let i = 0; i < 2; i++) {
	plays[i] = {
		totalMoves: 6,
		currentMove: 0,
	};
}
let player;

var playerColor = {
	1: "red",
	2: "blue",
};

init();

function init() {
	resetBoard();
	resetMoves();
	player = 1;
	calculateBoard();
	drawBoard();
}

function resetBoard() {
	board = new Array(boardSize);
	for (let i = 0; i < boardSize; i++) {
		board[i] = new Array(boardSize);
		for (let j = 0; j < board[i].length; j++) {
			board[i][j] = {
				player: document.getElementById(i + "," + j).value,
				number: 0,
			};
		}
	}
}

function resetMoves() {
	for (let i = 0; i < 2; i++) {
		moves[i] = new Array(plays[i].totalMoves);
	}
}

function handleMouseClick(evt) {
	let rect = cvs.getBoundingClientRect();
	let root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: -~(mouseX / blockSize) - 1,
		y: -~(mouseY / blockSize) - 1,
	};
}
function handleNextTurn(evt) {
	//if(moves[player-1][0] == undefined){return;}
	player++;
	if (player == 3) {
		player = 1;
		nextTurn();
	}
	document.getElementById("player").innerHTML = "player " + player + "s turn";
}
function nextTurn() {
	for (var i = 0; moves[0][i] != undefined; i++) {
		if (!checkMoves(1, moves[0][i])) {
			board[moves[0][i].x][moves[0][i].y].player = 1;
		}
	}
	for (var i = 0; moves[1][i] != undefined; i++) {
		if (!checkMoves(0, moves[1][i])) {
			board[moves[1][i].x][moves[1][i].y].player = 2;
		}
	}
	for (var i = 0; i < 2; i++) {
		plays[i].totalMoves -= plays[i].currentMove - 2;
		if (plays[i].totalMoves > 6) {
			plays[i].totalMoves = 6;
		}
		plays[i].currentMove = 0;
	}
	/*if(!(moves[0][0].x == moves[1][0].x && moves[0][0].y == moves[1][0].y)){
    board[moves[0][0].x][moves[0][0].y].player = 1;
    board[moves[1][0].x][moves[1][0].y].player = 2;
  }*/
	calculateBoard();
	resetMoves();
}
function checkMoves(playerNumber, move) {
	for (var i = 0; moves[playerNumber][i] != undefined; i++) {
		if (
			moves[playerNumber][i].x == move.x &&
			moves[playerNumber][i].y == move.y
		) {
			return true;
		}
	}
	return false;
}
function calculateBoard() {
	calculateNumbers();
	removeTiles();
	calculateNumbers();
}

function calculateNumbers() {
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			if (board[x][y].player != 0) {
				board[x][y].number = checkTiles(x, y);
			}
		}
	}
}
function removeTiles() {
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			if (board[x][y].number > 4 || board[x][y].number < 2) {
				board[x][y].player = 0;
			}
		}
	}
}

function checkTiles(tx, ty) {
	adjacent = 0;
	for (let x = -1; x < 2; x++) {
		for (let y = -1; y < 2; y++) {
			try {
				if (board[x + tx][y + ty].player != 0 && (x != 0 || y != 0)) {
					adjacent++;
				}
			} catch (err) {}
		}
	}
	return adjacent;
}

function drawBoard() {
	drawTiles();
	for (let i = 0; i < moves[player - 1].length; i++) {
		if (moves[player - 1][i] != undefined) {
			colorRect(
				moves[player - 1][i].x * blockSize,
				moves[player - 1][i].y * blockSize,
				blockSize,
				blockSize,
				playerColor[player]
			);
		}
	}
	drawNumbers();
}

function drawNumbers() {
	cxt.fillStyle = "white";
	cxt.font = "30px Futura";
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			if (board[x][y].player != 0) {
				cxt.fillText(
					board[x][y].number,
					x * blockSize + (blockSize / 2 - 10),
					y * blockSize + (blockSize / 2 + 13)
				);
			}
		}
	}
}

function drawTiles() {
	for (let x = 0; x < boardSize; x++) {
		for (let y = 0; y < boardSize; y++) {
			if ((x + y) % 2 == 0) {
				colorRect(x * blockSize, y * blockSize, blockSize, blockSize, "white");
			} else {
				colorRect(
					x * blockSize,
					y * blockSize,
					blockSize,
					blockSize,
					"rgb(200,200,200)"
				);
			}

			let tilePlayer = board[x][y].player;
			if (tilePlayer != 0) {
				colorRect(
					x * blockSize,
					y * blockSize,
					blockSize,
					blockSize,
					playerColor[tilePlayer]
				);
			}

			moves[player - 1][0];
		}
	}
}

function colorRect(leftX, topY, width, height, drawColor) {
	cxt.fillStyle = drawColor;
	cxt.fillRect(leftX, topY, width, height);
}

function checkPendingMoves(mousePos) {
	for (let i = 0; i < moves[player - 1].length; i++) {
		if (moves[player - 1][i] != undefined) {
			if (
				mousePos.x == moves[player - 1][i].x &&
				mousePos.y == moves[player - 1][i].y
			) {
				moves[player - 1].splice(i, 1);
				moves[player - 1].push(undefined); //take away position where the moves are the same and add an extra turn
				plays[player - 1].currentMove--;
				return true;
			}
		}
	}
	return false;
}

function addPendingMove(mousePos) {
	if (
		!checkPendingMoves(mousePos) &&
		plays[player - 1].currentMove != moves[player - 1].length
	) {
		moves[player - 1][plays[player - 1].currentMove] = {
			x: mousePos.x,
			y: mousePos.y,
		};
		plays[player - 1].currentMove++;
	}
}

window.onload = function () {
	cvs = document.getElementById("canvas");
	console.log("hi");

	cvs.addEventListener("mousedown", function (evt) {
		var mousePos = handleMouseClick(evt);
		if (board[mousePos.x][mousePos.y].player == 0) {
			addPendingMove(mousePos);
		}
		drawBoard();
	});
	//drawBoard();
	document.getElementById("turn").addEventListener("click", function (evt) {
		handleNextTurn(evt);
		drawBoard();
	});
	document.getElementById("reset").addEventListener("click", function (evt) {
		init();
	});
};
