import React, { useState } from 'react'
import styles from "./Block.module.scss"


interface Props {
	src: string,

}

export const Block = ({ src,  }: Props) => {
	
	const [isCardFlip, setIsCardFlip] = useState(false)


	return (
		<div
			onClick={() => {
				setIsCardFlip(!isCardFlip)

			}}
			className={`${styles.block} ${isCardFlip ? styles.back : styles.front}`}>
			<div>
				{src}
			</div>
		</div>
	);
}
