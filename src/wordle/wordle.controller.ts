import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WordleService } from './wordle.service';
import { WorldeGuessRequestDto } from './wordle.request.dto';
import { plainToInstance } from 'class-transformer';
import { WorldeGuessResponseDto } from './wordle.response.dto';

@Controller('wordle')
export class WordleController {
  constructor(private readonly service: WordleService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    return plainToInstance(WorldeGuessResponseDto, this.service.get(id));
  }

  @Post(':id')
  async guess(@Param('id') id: string, @Body() dto: WorldeGuessRequestDto) {
    return plainToInstance(
      WorldeGuessResponseDto,
      this.service.guess(id, dto.guess),
    );
  }

  @Post()
  async newGame() {
    return this.service.newGame();
  }
}
