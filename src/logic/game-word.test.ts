import GameWord from './game-word'
import TileState from './state'
import GameTile from './game-tile'

describe('Word', () => {
  describe('constructor', () => {
    // Act
    const result = new GameWord('hello')

    // Assert
    expect(result.guesses).toEqual(0)
    expect(result.tiles).toEqual([
      new GameTile('', TileState.Empty),
      new GameTile('', TileState.Empty),
      new GameTile('', TileState.Empty),
      new GameTile('', TileState.Empty),
      new GameTile('', TileState.Empty),
    ])
  })

  describe('guess', () => {
    it('throws error on invalid length', () => {
      // Arrange
      const word = new GameWord('hello')

      // Act
      const result = () => word.guess('')

      // Assert
      expect(result).toThrowError('invalid length')
    })

    it('returns true on done', () => {
      // Arrange
      const word = new GameWord('hello')

      // Act
      const result = word.guess('hello')

      // Assert
      expect(result).toBeTruthy()
      expect(word.guesses).toEqual(1)
      expect(word.tiles).toEqual([
        new GameTile('h', TileState.Correct),
        new GameTile('e', TileState.Correct),
        new GameTile('l', TileState.Correct),
        new GameTile('l', TileState.Correct),
        new GameTile('o', TileState.Correct),
      ])
    })

    const wordData = [
      {
        expected: 'hello',
        guess: 'happy',
        tiles: [
          new GameTile('h', TileState.Correct),
          new GameTile('a', TileState.Incorrect),
          new GameTile('p', TileState.Incorrect),
          new GameTile('p', TileState.Incorrect),
          new GameTile('y', TileState.Incorrect),
        ],
      },
      {
        expected: 'hello',
        guess: 'helle',
        tiles: [
          new GameTile('h', TileState.Correct),
          new GameTile('e', TileState.Correct),
          new GameTile('l', TileState.Correct),
          new GameTile('l', TileState.Correct),
          new GameTile('e', TileState.Incorrect),
        ],
      },
      {
        expected: 'hope',
        guess: 'ehop',
        tiles: [
          new GameTile('e', TileState.Misplaced),
          new GameTile('h', TileState.Misplaced),
          new GameTile('o', TileState.Misplaced),
          new GameTile('p', TileState.Misplaced),
        ],
      },
      {
        expected: 'hope',
        guess: 'hoep',
        tiles: [
          new GameTile('h', TileState.Correct),
          new GameTile('o', TileState.Correct),
          new GameTile('e', TileState.Misplaced),
          new GameTile('p', TileState.Misplaced),
        ],
      },
      {
        expected: 'hope',
        guess: 'heep',
        tiles: [
          new GameTile('h', TileState.Correct),
          new GameTile('e', TileState.Misplaced),
          new GameTile('e', TileState.Incorrect),
          new GameTile('p', TileState.Misplaced),
        ],
      },
      {
        expected: 'abcdef',
        guess: 'fedcba',
        tiles: [
          new GameTile('f', TileState.Misplaced),
          new GameTile('e', TileState.Misplaced),
          new GameTile('d', TileState.Misplaced),
          new GameTile('c', TileState.Misplaced),
          new GameTile('b', TileState.Misplaced),
          new GameTile('a', TileState.Misplaced),
        ],
      },
    ]

    wordData.forEach(({ expected, guess, tiles }) => {
      it(`returns false on guess '${guess}' and expected '${expected}'`, () => {
        // Arrange
        const word = new GameWord(expected)

        // Act
        const result = word.guess(guess)

        // Assert
        expect(result).toBeFalsy()
        expect(word.tiles).toEqual(tiles)
      })
    })
  })
})
