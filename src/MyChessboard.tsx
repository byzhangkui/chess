import Chessboard from 'chessboardjsx';
import { useState } from 'react';
import './App.css';

export const MyChessboard = (): JSX.Element => {
  const [ position, setPosition ] = useState('start');
  return (
      <Chessboard position={position} onPieceClick={(piece) => {
        console.log(`Piece clicked: ${piece}`);
      }} onDrop={(args) => {
        const {sourceSquare, targetSquare, piece} = args;
        // Piece dropped: {"sourceSquare":"h2","targetSquare":"h4","piece":"wP"}
        console.log(`Piece dropped: ${JSON.stringify(args)}`);
      }} 
      getPosition={((position)=>{
        console.log(`Position: ${JSON.stringify(position)}`);
      })}/>
  );
}

