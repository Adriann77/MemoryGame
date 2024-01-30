import { useEffect, useState } from 'react';
import SingleCard from './components/block/SingleCard/SingleCard';
import { Popup } from './components/block/Popup/Popup';

const cardImages = [
	{ src: '/img/arcadeEzreal.png', matched: false },
	{ src: '/img/ahri.png', matched: false },
	{ src: '/img/MissF.png', matched: false },
	{ src: '/img/Kaisa.png', matched: false },
	{ src: '/img/sona.png', matched: false },
	{ src: '/img/riven.png', matched: false },
];

function App() {
	const [cards, setCards] = useState<any[]>([]);
	const [turns, setTurns] = useState(5);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [begin, setBegin] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [isGameover, setIsGameover] = useState(true);
	const [showWinerPopup, setShowWinerPopup] = useState(false);
	const [showLosePopup, setShowLosePopup] = useState(false);

	const shuffleCards: () => void = () => {
		setBegin(true);
		setIsGameover(false)
		const shuffledCards: any[] = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map(card => ({ ...card, id: Math.random() }));

		setCards(shuffledCards);
		setTimeout(() => {
			setBegin(false);
		}, 2000);

		resetTurn();
	};

	const handleChoice = (card: any) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			//@ts-ignore
			if (choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id) {
				setCards(prevCards => {
					return prevCards.map(card => {
						//@ts-ignore
						if (card.src === choiceOne.src) {
							return { ...card, matched: true };
						} else {
							return card;
						}
					});
				});
				resetTurn();
			} else {
				setTimeout(() => {
					resetTurn();
				}, 600);
			}
		}
	}, [choiceTwo, choiceOne]);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurn => prevTurn - 1);
		setDisabled(false);
	};

	const setDifficult = (e: any) => {
		setIsGameover(false);
		shuffleCards();
		const difficulty = e.currentTarget.textContent;

		switch (difficulty) {
			case 'Easy':
				setTurns(24);
				break;

			case 'Hard':
				setTurns(12);
				break;

			case 'Medium':
				setTurns(18);
				break;

			case 'Impossible':
				setTurns(6);
				break;
		}
	};

	const handleGameOver = () => {
		let x = 0;
		cards.forEach(item => (item.matched == true ? (x = x + 1) : ''));
		if (x == 12) {
			setTimeout(() => {
				setDisabled(true);
				setShowLosePopup(false);
				setShowWinerPopup(true);
			}, 300);
		} else if (turns <= 0) {
			setTimeout(() => {
				setDisabled(true);
				setShowWinerPopup(false);
				setShowLosePopup(true);
			}, 300);
			
		}
		
	};

	useEffect(() => {
		handleGameOver();
	}, [turns]);

	const backToMenu = () => {
		setIsGameover(true);
		setShowLosePopup(false);
		setShowWinerPopup(false);
	};

	return (
		<>
			<div>
				{isGameover && (
					<div>
						<div className='content'>
							<h2>Memory Game</h2>
							<h2>Memory Game</h2>
						</div>
						<div className='btns'>
							<button
								className='glow-on-hover'
								onClick={setDifficult}>
								Easy
							</button>
							<button
								className='glow-on-hover'
								onClick={setDifficult}>
								Medium
							</button>
							<button
								className='glow-on-hover'
								onClick={setDifficult}>
								Hard
							</button>
							<button
								className='glow-on-hover'
								onClick={setDifficult}>
								Impossible
							</button>
						</div>
					</div>
				)}
				{(showLosePopup || showWinerPopup) && (
					<Popup
						backToMenu={backToMenu}
						src={`${showWinerPopup ? './img/youwin.png' : './img/gameover.jpeg'}`}
						text={`${showWinerPopup ? 'you win' : 'game over'}`}

					/>
				)}
				{!isGameover && (
					<div>
						{!showWinerPopup && !showLosePopup && <p className='score'>Turns left: {turns}</p>}
						<div className='card-grid'>
							{cards.map(card => (
								<SingleCard
									key={card.id}
									handleChoice={handleChoice}
									card={card}
									flipped={card === choiceOne || card === choiceTwo || card.matched === true || begin === true}
									disabled={disabled}
									isGreen={card.matched}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
