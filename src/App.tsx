import * as React from 'react'
import { useState } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import Word from './components/Word'
import GameWord from './logic/game-word'
import { getKeys } from 'js-synonyms/dist/interface'

const wordRegex = /^\w+$/
const possibleWords = getKeys().filter((w) => wordRegex.test(w))

const randomWord = (): string => {
  return possibleWords[Math.floor(Math.random() * possibleWords.length)]
}

function App() {
  const [words, setWords] = useState<GameWord[]>([new GameWord(randomWord())])

  const handleGuess = (guess: string) => {
    if (words[words.length - 1].guess(guess)) {
      setWords([new GameWord(randomWord())])
      return
    }

    setWords([...words, new GameWord(words[0].word)])
  }

  return (
    <Container fluid className="app-container">
      <Row>
        <Col className="text-center text-light">
          <h1>Guess the word</h1>
        </Col>
      </Row>
      {words.map((w, key) => <Word key={key} word={w} guess={handleGuess} />)}
    </Container>
  )
}

export default App
