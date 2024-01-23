import { useEffect, useState } from 'react';
import { Block } from '../Block/Block';
import styles from './GameBoard.module.scss';

interface Props {
	backToMenu: () => void;
	diff: string;
}

const blocks = [
	'💍',
	'💍',
	'👑',
	'👑',
	'🐒',
	'🐒',
	'🍀',
	'🍀',
	'☃️',
	'☃️',
	'💰',
	'💰',
	'🔪',
	'🔪',
	'🦠',
	'🦠',
	'🪭',
	'🪭',
	'🔮',
	'🔮',
];

export const GameBoard = ({ backToMenu, diff }: Props) => {
	const [shuffledCards, setShuffledCards] = useState<string[]>([]);

	const shuffleCards = () => {
		const shuffledCards = [...blocks].sort(() => Math.random() - 0.5).map(card => card);

		return shuffledCards;
	};

	useEffect(() => {
		setShuffledCards(shuffleCards());
	}, []);

	const shuffledCardsArray = shuffledCards.map((element, index) => {
		return (
			<div
				key={index}
				style={{
					backfaceVisibility: 'hidden',
				}}>
				<Block src={element} />
			</div>
		);
	});

	return (
		<div className={styles.costam}>
			<button
				style={{
					position: 'absolute',
					top: '28px',
					padding: '1rem',
				}}
				onClick={backToMenu}>
				Return
			</button>

			<div className={styles.gameBoard}>{shuffledCardsArray}</div>
		</div>
	);
};
