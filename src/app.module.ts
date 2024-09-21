import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WordleController } from './wordle/wordle.controller';
import { WordleService } from './wordle/wordle.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [WordleController],
  providers: [WordleService],
})
export class AppModule {}
