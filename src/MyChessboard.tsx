import Chessboard, { Piece } from "chessboardjsx";
import { useRef, useState } from "react";
import { Chess, Square } from "chess.js";
import "./App.css";

export const MyChessboard = (): JSX.Element => {
  const chessGameRef = useRef(new Chess());
  const [position, setPosition] = useState("start");
  const [selectedSquareWithPiece, setSelectedSquareWithPiece] = useState<
    Square | undefined
  >(undefined);
  const [highlightSquares, setHighlightSquares] = useState<Square[]>([]);

  return (
    <Chessboard
      showNotation={true}
      position={position}
      squareStyles={
        // highlight the square if it is selected and has a piece
        highlightSquares
          ? Object.fromEntries(
              highlightSquares.map((square) => [
                square,
                {
                  backgroundColor: "rgba(255, 255, 0, 0.4)",
                },
              ])
            )
          : {}
      }
      onSquareClick={(square) => {
        console.log(`Square clicked: ${square}`);
        const preSelectedSquare = selectedSquareWithPiece;
        const hasPieceOn = chessGameRef.current.get(square);
        const currentSelectedSquare = square;

        if (hasPieceOn) {
          // if has piece, then select
          setSelectedSquareWithPiece(square);
          setHighlightSquares([square]);
        } else {
          // if has no piece, move or deselect
          if (preSelectedSquare) {
            // if has selected square, try to move
            if (preSelectedSquare !== currentSelectedSquare) {
              try {
                chessGameRef.current.move({
                  from: preSelectedSquare,
                  to: currentSelectedSquare,
                });
                setPosition(chessGameRef.current.fen());
                setSelectedSquareWithPiece(square);
                setHighlightSquares([preSelectedSquare, square]);
              } catch (e) {
                console.log(`Invalid move: ${e}`);
                setSelectedSquareWithPiece(undefined);
              }
            }
          } else {
            // if has no selected square, then deselect
            setSelectedSquareWithPiece(undefined);
          }
        }
      }}
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
