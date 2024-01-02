import { Block } from './components/block/Block';

const blocks = ['😄', '😁', '🥳', '🤯', '😄', '😁', '🥳', '🤯'];

const adas = () => {
  console.log(blocks[Math.random() * blocks.length]);
}

function App() {

	
  
  return (
    <>
      <div onClick={adas}>eds</div>
			<Block
				src={blocks[Math.random() * blocks.length]}
			
			/>
		</>
	);
}

export default App;
