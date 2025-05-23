import pawnWhite from '../assets/pawn-w.svg';
import pawnBlack from '../assets/pawn-b.svg';
import bishopBlack from '../assets/bishop-b.svg';
import bishopWhite from '../assets/bishop-w.svg';
import kingBlack from '../assets/king-b.svg';
import kingWhite from '../assets/king-w.svg';
import knightBlack from '../assets/knight-b.svg';
import knightWhite from '../assets/knight-w.svg';
import queenBlack from '../assets/queen-b.svg';
import queenWhite from '../assets/queen-w.svg';
import rookBlack from '../assets/rook-b.svg';
import rookWhite from '../assets/rook-w.svg';

type PieceImageProps = {
	pieceType: 'pawn' | 'rook' | 'bishop' | 'knight' | 'king' | 'queen';
	color: 'black' | 'white';
};

function PieceImage({ pieceType, color }: PieceImageProps) {
	let piece: string;
	const altText: string = `${color} ${pieceType}`;

	switch (pieceType) {
		case 'pawn':
			piece = color === 'black' ? pawnBlack : pawnWhite;
			break;
		case 'rook':
			piece = color === 'black' ? rookBlack : rookWhite;
			break;
		case 'bishop':
			piece = color === 'black' ? bishopBlack : bishopWhite;
			break;
		case 'knight':
			piece = color === 'black' ? knightBlack : knightWhite;
			break;
		case 'queen':
			piece = color === 'black' ? queenBlack : queenWhite;
			break;
		case 'king':
			piece = color === 'black' ? kingBlack : kingWhite;
			break;
		default:
			return null;
	}

	return <img src={piece} alt={altText} />;
}

export default PieceImage;
