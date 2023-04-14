import GameTile from '../logic/game-tile'
import './Tile.css'
import TileState from '../logic/state'
import { KeyboardEvent } from 'react'

interface TileProps {
  tile: GameTile
  input: string
  disabled: boolean
  focus: boolean
  onChange: (letter: string) => void
  onClick: () => void
  moveLeft: () => void
  moveRight: () => void
  backspace: () => void
}

function Tile({
  onChange,
  input,
  disabled,
  focus,
  onClick,
  tile,
  moveRight,
  moveLeft,
  backspace,
}: TileProps) {
  let style = 'tile-empty'
  let title = 'Fill in a letter and press enter to verify'

  switch (tile.state) {
    case TileState.Incorrect:
      style = 'tile-incorrect'
      title = 'This letter is incorrect'
      break

    case TileState.Correct:
      style = 'tile-correct'
      title = 'This letter is correct'
      break

    case TileState.Misplaced:
      style = 'tile-misplaced'
      title = 'This letter should be used somewhere else'
      break
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowLeft':
        moveLeft()
        break

      case 'ArrowRight':
        moveRight()
        break

      case 'Backspace':
        backspace()
        break
    }
  }

  return (
    <input
      type="text"
      min="1"
      max="1"
      title={title}
      className={`tile-input ${style}`}
      required={true}
      onSelect={onClick}
      onChange={(e) => {
        onChange(e.target.value.substring(0, 1))
      }}
      onKeyDown={handleKeyDown}
      readOnly={disabled}
      value={input}
      pattern="^[a-zA-Z]$"
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
