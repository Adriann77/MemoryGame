import './Popup.scss';
import '../../../index.scss'

interface Props{
    backToMenu: () => void;
	text: string;
	src: string;
}

export const Popup = ({backToMenu, src, text}: Props) => {
	return (
		<>
			<div className='lose-popup'>
				<img src={src} alt="" />
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
