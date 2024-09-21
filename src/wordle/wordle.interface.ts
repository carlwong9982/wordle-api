export enum WordleGuessStatus {
  HIT = 'HIT',
  PRESENT = 'PRESENT',
  MISS = 'MISS',
}

export enum WordleGameStatus {
  WIN = 'WIN',
  LOSE = 'LOSE',
  PLAYING = 'PLAYING',
}

export interface WordleGuess {
  letter: string;
  status: WordleGuessStatus;
}

export interface WordleGame {
  id: string;
  answer: string;
  status: WordleGameStatus;
  guesses: WordleGuess[][];
}
