import * as React from 'react'
import { FormEvent, useState } from 'react'
import './Word.css'
import GameWord from '../logic/game-word'
import Tile from './Tile'
import { Button, Col, Row } from 'react-bootstrap'

interface WordProps {
  word: GameWord
  guess: (guess: string) => void
  disabled: boolean
}

function Word({ word, guess, disabled }: WordProps) {
  const [input, setInput] = useState(new Array(word.tiles.length).fill(' '))
  const [focus, setFocus] = useState(0)

  const handleInput = (letter: string, index: number) => {
    input[index] = letter
    setInput([...input])
    handleMoveRight()
  }

  const handleMoveLeft = () => {
    setFocus((focus === 0) ? word.tiles.length - 1 : focus - 1)
  }

  const handleMoveRight = () => {
    setFocus((focus === word.tiles.length - 1) ? 0 : focus + 1)
  }

  const handleBackspace = (index: number) => {
    handleMoveLeft()
    input[index] = ''
    setInput([...input])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    guess(input.join(''))
  }

  return (
    <form className="word-row" onSubmit={handleSubmit}>
      <Row>
        {word.tiles.map((tile, key) => (
          <Col key={key} className="justify-content-center d-flex">
            <Tile
              tile={tile}
              focus={focus === key}
              input={input[key]}
              disabled={disabled}
              moveLeft={handleMoveLeft}
              moveRight={handleMoveRight}
              backspace={() => { handleBackspace(key) }}
              onClick={() => { setFocus(key) }}
              onChange={(l) => { handleInput(l, key) }}
            />
          </Col>
        ))}
      </Row>
      <Button style={{ display: 'none' }} type="submit"></Button>
    </form>
  )
}

export default Word
