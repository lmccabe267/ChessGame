import { useEffect, useState } from 'react';
import Piece from './Piece';
import type { Position } from '../logic/moveset';

const squareSize = 'w-[100px] h-[100px]';
type PieceType = 'pawn' | 'rook' | 'bishop' | 'knight' | 'king' | 'queen';
type PieceData = {
	pieceType: PieceType;
	color: 'black' | 'white';
	position: Position;
};

function Board() {
	const [activePosition, setActivePosition] = useState<Position | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const [pieces, setPieces] = useState<PieceData[]>([
		// White pieces
		{ pieceType: 'rook', color: 'white', position: [0, 0] },
		{ pieceType: 'knight', color: 'white', position: [0, 1] },
		{ pieceType: 'bishop', color: 'white', position: [0, 2] },
		{ pieceType: 'queen', color: 'white', position: [0, 3] },
		{ pieceType: 'king', color: 'white', position: [0, 4] },
		{ pieceType: 'bishop', color: 'white', position: [0, 5] },
		{ pieceType: 'knight', color: 'white', position: [0, 6] },
		{ pieceType: 'rook', color: 'white', position: [0, 7] },
		...Array.from(
			{ length: 8 },
			(_, i): PieceData => ({
				pieceType: 'pawn' as PieceType,
				color: 'white',
				position: [1, i],
			}),
		),
		// Black pieces
		{ pieceType: 'rook', color: 'black', position: [7, 0] },
		{ pieceType: 'knight', color: 'black', position: [7, 1] },
		{ pieceType: 'bishop', color: 'black', position: [7, 2] },
		{ pieceType: 'queen', color: 'black', position: [7, 3] },
		{ pieceType: 'king', color: 'black', position: [7, 4] },
		{ pieceType: 'bishop', color: 'black', position: [7, 5] },
		{ pieceType: 'knight', color: 'black', position: [7, 6] },
		{ pieceType: 'rook', color: 'black', position: [7, 7] },
		...Array.from(
			{ length: 8 },
			(_, i): PieceData => ({
				pieceType: 'pawn' as PieceType,
				color: 'black',
				position: [6, i],
			}),
		),
	]);

	useEffect(() => {}, [activePosition]);
	const handleSquareClick = (row: number, col: number) => {
		const clickedPos: Position = [row, col];

		if (activeIndex !== null) {
			// Move the active piece to the clicked square
			setPieces((prev) => {
				const newPieces = [...prev];
				newPieces[activeIndex] = {
					...newPieces[activeIndex],
					position: clickedPos,
				};
				return newPieces;
			});
			setActiveIndex(null); // Deselect after move
		} else {
			// Try to select a piece at the clicked square
			const index = pieces.findIndex((p) => p.position[0] === row && p.position[1] === col);
			if (index !== -1) {
				setActiveIndex(index);
			}
		}
	};

	return (
		<>
			<div className='relative w-fit'>
				<div className='absolute top-0 left-0 grid grid-cols-9 z-20 pointer-events-none'>
					{Array.from({ length: 72 }, (_, i) => {
						const row = Math.floor(i / 9);
						const col = i % 9;
						return (
							<div
								key={`click-${row}-${col}`}
								className={`${squareSize} ${
									col === 8 ? 'bg-red-500' : ''
								} border border-black hover:bg-blue-100 pointer-events-auto`}
								onClick={() => handleSquareClick(row, col)}
							/>
						);
					})}
				</div>
				<div className='relative w-[900px] h-[800px] z-10'>
					{pieces.map((p, index) => (
						<div
							key={index}
							className='absolute'
							style={{
								top: `${p.position[0] * 100}px`,
								left: `${p.position[1] * 100}px`,
							}}
						>
							<Piece
								activePosition={activePosition}
								pieceType={p.pieceType}
								color={p.color}
								position={p.position}
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Board;
