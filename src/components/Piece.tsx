import { useEffect, useState } from 'react';
import PieceImage from './PieceImage';
import type { Position } from '../logic/moveset';
import { getMoves } from '../logic/moveset';

type PieceProps = {
	activePosition: Position | null;
	pieceType: 'pawn' | 'rook' | 'bishop' | 'knight' | 'king' | 'queen';
	position: Position;
	color: 'black' | 'white';
};

function Piece({ activePosition, pieceType, color, position }: PieceProps) {
	const turn = 'white';

	useEffect(() => {
		if (turn == color && activePosition?.[0] == position[0] && activePosition?.[1] == position[1]) {
			console.log('here');
			const moves = getMoves(pieceType, position, color);
			console.log(`Piece: ${pieceType} ${color} moves: ${JSON.stringify(moves)}`);
		}
	});

	return (
		<>
			<div
				className={`${activePosition?.[0] == position[0] && activePosition?.[1] == position[1] ? 'bg-blue-500' : 'transparent'} w-[100px] h-[100px]`}
			>
				<PieceImage pieceType={pieceType} color={color} />
			</div>
		</>
	);
}

export default Piece;
