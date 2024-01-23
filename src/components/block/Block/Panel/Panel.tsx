import { useState } from 'react';
import styles from './Panel.module.scss';
import { GameBoard } from '../GameBoard/GameBoard';

export const Panel = () => {
	const [diff, setDiff] = useState('');

	const handleDifficultyButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		setDiff(e.currentTarget.textContent || '');
	};

	const backToMenu = () => {
		setDiff('')
	}

	return (
		<>
			<main>
				{diff === '' && (
					<div>
						<h1 className={styles.headingTitle}>Memory Game</h1>
						<h2>Choose diffucult:</h2>
						<div className={styles.DiffucultButtons}>
							<button onClick={handleDifficultyButtonClick}>Easy</button>
							<button onClick={handleDifficultyButtonClick}>Medium</button>
							<button onClick={handleDifficultyButtonClick}>Hard</button>
							<button onClick={handleDifficultyButtonClick}>Impossible</button>
						</div>
					</div>
				)}
				<div>{diff !== '' && <GameBoard diff={diff} backToMenu={backToMenu} />}</div>
			</main>
		</>
	);
};
