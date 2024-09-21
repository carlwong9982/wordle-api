import { Exclude, Expose } from 'class-transformer';
import { WordleGameStatus, WordleGuess } from './wordle.interface';

@Exclude()
export class WorldeGuessResponseDto {
  @Expose()
  id: string;

  answer: string;

  @Expose()
  status: WordleGameStatus;

  @Expose()
  guesses: WordleGuess[][];
}
