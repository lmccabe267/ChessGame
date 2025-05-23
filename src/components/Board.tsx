import { useEffect, useState } from 'react';
import Piece from './Piece';
import type { Position } from '../logic/moveset';

const squareSize = 'w-[100px] h-[100px]';

function Board() {
	const [activePosition, setActivePosition] = useState<Position | null>(null);

	useEffect(() => {}, [activePosition]);
	const handleSquareClick = (row: number, col: number) => {
		setActivePosition([row, col]);
	};

	return (
		<>
			<div className='relative w-fit'>
				<div className='absolute top-0 left-0 grid grid-cols-8 z-20 pointer-events-none'>
					{Array.from({ length: 64 }, (_, i) => {
						const row = Math.floor(i / 8);
						const col = i % 8;
						return (
							<div
								key={`click-${row}-${col}`}
								className={`${squareSize} border border-black hover:bg-blue-100 pointer-events-auto`}
								onClick={() => handleSquareClick(row, col)}
							/>
						);
					})}
				</div>
				<div className='grid grid-cols-8 z-10'>
					<Piece
						activePosition={activePosition}
						pieceType={'pawn'}
						color={'white'}
						startPos={[0, 0]}
					/>
					<Piece
						activePosition={activePosition}
						pieceType={'king'}
						color={'white'}
						startPos={[0, 1]}
					/>
				</div>
			</div>
		</>
	);
}

export default Board;
