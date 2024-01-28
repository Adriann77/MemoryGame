import './Popup.scss';
import '../../../index.scss'

interface Props{
    backToMenu: () => void;
    text: string;
}

export const Popup = ({backToMenu, text}: Props) => {
	return (
		<>
			<div className='lose-popup'>
				<p>{text}</p>
				<button
					className='glow-on-hover'
					onClick={backToMenu}>
					Play again
				</button>
			</div>
		</>
	);
};
