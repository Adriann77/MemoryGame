import './SingleCard.scss';

interface Props {
	card: any;
	handleChoice: any;
	flipped: boolean;
	disabled: boolean;
	isGreen: boolean;
}

export default function SingleCard({ card, handleChoice, flipped, disabled, isGreen }: Props) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};

	return (
		<div className='card'>
			<div className={flipped ? 'flipped' : ''}>
				<img
					
					className={`front ${isGreen ? 'matched' : ''}`}
					src={card.src}
					alt='card front'
				/>
				<img
					onClick={handleClick}
					className='back'
					src='./img/arcadeCover.jpeg'
					alt='card back'
				/>
			</div>
		</div>
	);
}
