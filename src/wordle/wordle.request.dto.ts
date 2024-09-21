import { IsNotEmpty, IsString } from 'class-validator';

export class WorldeGuessRequestDto {
  @IsNotEmpty()
  @IsString()
  guess: string;
}
