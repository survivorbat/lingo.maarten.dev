import GameTile from './game-tile'
import TileState from './state'

export default class GameWord {
  guesses: number = 0

  tiles: GameTile[]

  private readonly letters: string[]

  private readonly letterCount: Record<string, number>

  constructor(readonly word: string) {
    if (word.length === 0) {
      throw new Error('word may not be empty')
    }

    this.letters = word.split('')
    this.tiles = this.letters.map((l) => new GameTile('', TileState.Empty))
    this.letterCount = this.letters.reduce<Record<string, number>>(
      (result, current) => {
        if (result[current] === undefined) {
          result[current] = 0
        }

        result[current]++
        return result
      },
      {}
    )
  }

  guess(guess: string): boolean {
    this.guesses += 1

    if (guess.length !== this.word.length) {
      throw new Error('invalid length')
    }

    if (guess === this.word) {
      this.tiles = this.letters.map((l) => new GameTile(l, TileState.Correct))
      return true
    }

    // Copy letterCount so we can mutate it
    const currentCounter = this.letterCount

    this.tiles = guess.split('').map((l, index) => {
      if (this.letters[index] === l) {
        currentCounter[l] -= 1
        return new GameTile(l, TileState.Correct)
      }

      if (this.word.includes(l)) {
        currentCounter[l] -= 1

        if (currentCounter[l] >= 0) {
          return new GameTile(l, TileState.Misplaced)
        }
      }

      return new GameTile(l, TileState.Incorrect)
    })

    return false
  }
}
