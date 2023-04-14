import GameTile from './game-tile'
import TileState from './state'

export default class GameWord {
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
    if (guess.length !== this.word.length) {
      throw new Error('invalid length')
    }

    if (guess === this.word) {
      this.tiles = this.letters.map((l) => new GameTile(l, TileState.Correct))
      return true
    }

    // Copy letterCount so we can mutate it
    const currentCounter = this.letterCount

    const guessLetters = guess.split('')

    // First we have to process all correct letters so we can lower the counter
    guessLetters.forEach((l, index) => {
      if (this.letters[index] === l) {
        currentCounter[l] -= 1
        this.tiles[index] = new GameTile(l, TileState.Correct)
      }
    })

    // Then process all the incorrect ones
    guessLetters.forEach((l, index) => {
      // Ignore the correct ones now
      if (this.letters[index] === l) {
        return
      }

      if (this.word.includes(l)) {
        currentCounter[l] -= 1

        if (currentCounter[l] >= 0) {
          this.tiles[index] = new GameTile(l, TileState.Misplaced)
          return
        }
      }

      this.tiles[index] = new GameTile(l, TileState.Incorrect)
    })

    return false
  }
}
