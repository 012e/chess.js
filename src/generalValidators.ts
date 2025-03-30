import { Result, OK_RESULT, BoardContext } from './chess';

export function inBoundValiator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
): Result {
  if (
    fromRow < 0 ||
    fromRow >= 10 ||
    fromCol < 0 ||
    fromCol >= 9 ||
    toRow < 0 ||
    toRow >= 10 ||
    toCol < 0 ||
    toCol >= 9
  ) {
    return { ok: false, message: 'Move out of bounds.' };
  }
  return OK_RESULT;
}

export function fromPieceValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board, currentPlayer }: BoardContext,
): Result {
  const piece = board[fromRow][fromCol];
  if (!piece) {
    return { ok: false, message: 'No piece at the starting position.' };
  }
  return OK_RESULT;
}
export function duplicateMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
): Result {
  if (fromRow === toRow && fromCol === toCol) {
    return { ok: false, message: "Can't move to the same position." };
  }
  return OK_RESULT;
}
export function correctTurnValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board, currentPlayer }: BoardContext,
): Result {
  const piece = board[fromRow][fromCol];
  if (!piece) {
    return { ok: false, message: 'No piece at the starting position.' };
  }
  const isPieceRed = piece === piece.toUpperCase();
  if (isPieceRed && currentPlayer !== 'w') {
    return { ok: false, message: "Not the current player's piece." };
  } else if (!isPieceRed && currentPlayer !== 'b') {
    return { ok: false, message: "Not the current player's piece." };
  }
  return OK_RESULT;
}
export function captureOwnPieceValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board }: BoardContext,
): Result {
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];
  if (targetPiece) {
    const isPieceRed = piece === piece.toUpperCase();
    const isTargetRed = targetPiece === targetPiece.toUpperCase();
    if ((isPieceRed && isTargetRed) || (!isPieceRed && !isTargetRed)) {
      return { ok: false, message: "Can't capture own piece." };
    }
  }
  return OK_RESULT;
}
