import { useEffect, useState } from 'react';
import SingleCard from './components/block/SingleCard';

const cardImages = [
	{ src: '/img/golbin.jpeg', matched: false },
	{ src: '/img/dwarf.jpeg', matched: false },
	{ src: '/img/iorweth.webp', matched: false },
	{ src: '/img/ork.jpeg', matched: false },
	{ src: '/img/smigol.jpeg', matched: false },
	{ src: '/img/wicher.jpg', matched: false },
];

function App() {
	const [cards, setCards] = useState<any[]>([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [begin, setBegin] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [diff, setDiff] = useState(null);
	const [isGameover, setIsGameover] = useState(false);
	const [showWinerPopup, setShowWinerPopup] = useState(false);
	const [showLosePopup, setShowLosePopup] = useState(false);

	const shuffleCards = () => {
		setBegin(true);
		const shuffledCards = [...cardImages, ...cardImages]
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
		setDiff(e.target.textContent);
		switch (difficulty) {
			//@ts-ignore
			case 'Easy':
				setTurns(24);

				break;
			//@ts-ignore
			case 'Hard':
				setTurns(12);

				break;
			//@ts-ignore
			case 'Medium':
				setTurns(18);

				break;
			//@ts-ignore
			case 'Impossible':
				setTurns(6);

				break;
		}
	};

	const handleGameOver = () => {
		let x = 0;
		if (turns <= 0) {
			setShowLosePopup(true)
			setTimeout(() => {
				setIsGameover(true);
				setShowLosePopup(false)
			},2000)
		} else {
			cards.forEach(item => (item.matched == true ? (x = x + 1) : ''));
		}
		if (x == 12) {
			setShowWinerPopup(true);
			setTimeout(() => {
				setShowWinerPopup(false);
				setIsGameover(true);
			}, 2000);
		}
	};

	useEffect(() => {
		handleGameOver();
	}, [turns]);

	return (
		<>
			<h1>Memory game</h1>
			<div>
				{isGameover && (
					<div className='btns'>
						<button onClick={setDifficult}>Easy</button>
						<button onClick={setDifficult}>Medium</button>
						<button onClick={setDifficult}>Hard</button>
						<button onClick={setDifficult}>Impossible</button>
					</div>
				)}
				{!isGameover && (
					<div>
						{showLosePopup && <p>Przegrałeś</p>}
						{showWinerPopup && <p>WYGRALES</p>}
						{(!showWinerPopup && !showLosePopup) && <p>Turns left: {turns}</p>}
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
