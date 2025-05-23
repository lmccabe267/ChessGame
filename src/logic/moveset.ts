export type Position = [number, number];

//possible movement calc by AI to save time.
//Some parts are pulled from a previous chess project.
//This is the only file made with assistance for timesake
//the return statements in these functions were made with AI assistance

export function getKingMoves(pos: Position): Position[] {
	const [r, c] = pos;

	return [
		[r - 1, c - 1],
		[r - 1, c],
		[r - 1, c + 1],
		[r, c - 1],
		[r, c + 1],
		[r + 1, c - 1],
		[r + 1, c],
		[r + 1, c + 1],
	]
		.map((move) => move as Position) // 👈 force it to treat each as [number, number]
		.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}

export function getQueenMoves([r, c]: Position): Position[] {
	return [...getRookMoves([r, c]), ...getBishopMoves([r, c])];
}

export function getRookMoves([r, c]: Position): Position[] {
	const moves: Position[] = [];

	for (let i = 0; i < 8; i++) {
		if (i !== r) moves.push([i, c]);
		if (i !== c) moves.push([r, i]);
	}

	return moves;
}

export function getBishopMoves([r, c]: Position): Position[] {
	const moves: Position[] = [];

	for (let i = 1; i < 8; i++) {
		if (r + i < 8 && c + i < 8) moves.push([r + i, c + i]);
		if (r - i >= 0 && c - i >= 0) moves.push([r - i, c - i]);
		if (r + i < 8 && c - i >= 0) moves.push([r + i, c - i]);
		if (r - i >= 0 && c + i < 8) moves.push([r - i, c + i]);
	}

	return moves;
}

export function getKnightMoves([r, c]: Position): Position[] {
	const deltas = [
		[2, 1],
		[1, 2],
		[-1, 2],
		[-2, 1],
		[-2, -1],
		[-1, -2],
		[1, -2],
		[2, -1],
	];

	return deltas
		.map(([dr, dc]) => [r + dr, c + dc] as Position)
		.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}

export function getPawnMoves([r, c]: Position, color: 'white' | 'black'): Position[] {
	const dir = color === 'white' ? -1 : 1;
	const startRow = color === 'white' ? 6 : 1;

	const moves: Position[] = [];

	// Move forward
	if (r + dir >= 0 && r + dir < 8) {
		moves.push([r + dir, c]);

		// Double step from start row
		if (r === startRow && r + 2 * dir >= 0 && r + 2 * dir < 8) {
			moves.push([r + 2 * dir, c]);
		}
	}

	// Capture diagonals (optional: check if enemy exists)
	if (c - 1 >= 0 && r + dir >= 0 && r + dir < 8) {
		moves.push([r + dir, c - 1]);
	}
	if (c + 1 < 8 && r + dir >= 0 && r + dir < 8) {
		moves.push([r + dir, c + 1]);
	}

	return moves;
}

export function getMoves(piece: string, [r, c]: Position, color: 'white' | 'black'): Position[] {
	switch (piece.toLowerCase()) {
		case 'king':
			return getKingMoves([r, c]);
		case 'queen':
			return getQueenMoves([r, c]);
		case 'rook':
			return getRookMoves([r, c]);
		case 'bishop':
			return getBishopMoves([r, c]);
		case 'knight':
			return getKnightMoves([r, c]);
		case 'pawn':
			return getPawnMoves([r, c], color);
		default:
			return [[-1, -1]] as Position[];
	}
}
