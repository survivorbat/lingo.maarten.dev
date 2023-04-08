import TileState from './state'
import GameTile from './game-tile'

describe('Tile', () => {
  describe('constructor', () => {
    it('sets expected values', () => {
      // Act
      const result = new GameTile('a', TileState.Incorrect)

      // Assert
      expect(result.letter).toEqual('a')
      expect(result.state).toEqual(TileState.Incorrect)
    })
  })
})
