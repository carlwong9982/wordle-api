import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import {
  WordleGame,
  WordleGameStatus,
  WordleGuessStatus,
} from './wordle.interface';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WordleService implements OnModuleInit {
  private words: string[];
  private wordSet: Set<string>;
  private games: Map<string, WordleGame> = new Map();
  private maxRound: number;

  constructor(private readonly config: ConfigService) {}

  private handleGuess(guess: string, game: WordleGame) {
    const answer = game.answer;
    const guessArr = guess.split('');
    const result = guessArr.map((letter, index) => {
      if (letter === answer[index]) {
        return { letter, status: WordleGuessStatus.HIT };
      }
      if (answer.includes(letter)) {
        return { letter, status: WordleGuessStatus.PRESENT };
      }
      return { letter, status: WordleGuessStatus.MISS };
    });
    return result;
  }

  async get(id: string) {
    const game = this.games.get(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    return game;
  }

  async guess(id: string, guess: string) {
    guess = guess.toUpperCase();
    const game = this.games.get(id);
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    if (game.status !== 'PLAYING') {
      return game;
    }
    if (guess.length !== 5 || !this.wordSet.has(guess)) {
      throw new BadRequestException('Invalid guess');
    }

    const guessResult = this.handleGuess(guess, game);
    game.guesses.push(guessResult);
    if (guessResult.every((item) => item.status === WordleGuessStatus.HIT)) {
      game.status = WordleGameStatus.WIN;
    }
    const round = game.guesses.length;
    if (round >= this.maxRound) {
      game.status = WordleGameStatus.LOSE;
    }
    return game;
  }

  async newGame() {
    const id = v4();
    const answer = this.words[Math.floor(Math.random() * this.words.length)];
    const game: WordleGame = {
      id,
      answer,
      status: WordleGameStatus.PLAYING,
      guesses: [],
    };
    this.games.set(id, game);
    return { id };
  }

  onModuleInit() {
    let data: string;
    try {
      data = readFileSync(`${global.appRoot}/config/words.txt`, 'utf-8');
    } catch (err) {
      console.error('Failed to read words.txt');
      throw err;
    }
    this.words = data
      .split('\n')
      .filter((word) => word.length === 5)
      .map((word) => word.toUpperCase());
    this.wordSet = new Set(this.words);

    this.maxRound = Number(this.config.get('MAX_ROUND'));
    if (Number.isNaN(this.maxRound)) {
      this.maxRound = 5;
    }
  }
}
