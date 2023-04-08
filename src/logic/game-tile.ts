import TileState from './state'

export default class GameTile {
  constructor(
    public readonly letter: string,
    public readonly state: TileState
  ) {}
}
