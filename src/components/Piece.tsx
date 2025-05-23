import { useState } from 'react';
import PieceImage from './PieceImage';
import type { Position } from '../logic/moveset';
import { getMoves } from '../logic/moveset';

type PieceProps = {
	activePosition: Position | null;
	pieceType: 'pawn' | 'rook' | 'bishop' | 'knight' | 'king' | 'queen';
	startPos: Position;
	color: 'black' | 'white';
};

function Piece({ activePosition, pieceType, color, startPos }: PieceProps) {
	const turn = 'white';
	const [position, setPosition] = useState(startPos);

	const handleClick = () => {
		if (turn == color) {
			const moves = getMoves(pieceType, position, color);
			console.log(moves);
		}
	};

	const movePiece = (pos: Position) => {
		setPosition(pos);
	};

	return (
		<>
			<div
				onClick={handleClick}
				className={`${activePosition?.[0] == position[0] && activePosition?.[1] == position[1] ? 'bg-blue-500' : 'transparent'} w-[100px] h-[100px]`}
			>
				<PieceImage pieceType={pieceType} color={color} />
			</div>
		</>
	);
}

export default Piece;
