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
					style={{
						border: `${isGreen ? '1px solid rgb(155,255,0, .3)' : ''}`,
					}}
					className='front'
					src={card.src}
					alt='card front'
				/>
				<img
					onClick={handleClick}
					className='back'
					src='./img/cover.webp'
					alt='card back'
				/>
			</div>
		</div>
	);
}