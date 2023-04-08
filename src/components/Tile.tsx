import GameTile from '../logic/game-tile'
import './Tile.css'
import TileState from '../logic/state'

interface TileProps {
  tile: GameTile
  input: string
  disabled: boolean
  focus: boolean
  onChange: (letter: string) => void
  onClick: () => void
}

function Tile({ onChange, input, disabled, focus, onClick, tile }: TileProps) {
  let style = 'tile-empty'

  switch (tile.state) {
    case TileState.Incorrect:
      style = 'tile-incorrect'
      break

    case TileState.Correct:
      style = 'tile-correct'
      break

    case TileState.Misplaced:
      style = 'tile-misplaced'
      break
  }

  return (
    <input
      type="text"
      min="1"
      max="1"
      className={`tile-input ${style}`}
      required={true}
      onSelect={onClick}
      onChange={(e) => {
        onChange(e.target.value.substring(0, 1))
      }}
      readOnly={disabled}
      value={input}
      ref={(input) => {
        if (focus) {
          input?.focus()
          input?.setSelectionRange(0, 0)
        }
      }}
    />
  )
}

export default Tile
