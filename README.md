# Wordle Game

This is the api of a wordle game. To start the game, please copy the `.env.exmaple` file to `.env` and use the `POST /wordle` api

## API

> POST /wordle

Start a new game, it will return the game id

> POST /wordle/:id

Use the payload `{"guess": "WORDS"}` to make a guess

> GET /wordle/:id

Get the game by id
