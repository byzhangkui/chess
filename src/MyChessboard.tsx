import Chessboard from "chessboardjsx";
import { useRef, useState } from "react";
import { Chess, Square } from "chess.js";
import "./App.css";

export const MyChessboard = (): JSX.Element => {
  const chessGameRef = useRef(new Chess());
  const [position, setPosition] = useState("start");
  return (
    <Chessboard
      position={position}
      onPieceClick={(piece) => {
        console.log(`Piece clicked: ${piece}`);
      }}
      onDrop={(args) => {
        const { sourceSquare, targetSquare, piece } = args;
        try {
          chessGameRef.current.move({
            from: sourceSquare,
            to: targetSquare,
          });
          setPosition(chessGameRef.current.fen());
        } catch (e) {
          console.log(`Invalid move: ${e}`);
        }
      }}
      allowDrag={(args) => {
        const { piece, sourceSquare } = args;
        // do not pick up pieces if the game is over
        if (chessGameRef.current.isGameOver()) return false;

        // only pick up pieces for the side to move
        if (
          (chessGameRef.current.turn() === "w" && piece.search(/^b/) !== -1) ||
          (chessGameRef.current.turn() === "b" && piece.search(/^w/) !== -1)
        ) {
          return false;
        }
        return true;
      }}
      getPosition={(position) => {
        console.log(`Position: ${JSON.stringify(position)}`);
      }}
    />
  );
};
