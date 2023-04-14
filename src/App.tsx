import * as React from 'react'
import { useState } from 'react'
import './App.css'
import { Col, Container, Row } from 'react-bootstrap'
import Word from './components/Word'
import GameWord from './logic/game-word'

const possibleWords = [
  'hello',
  'happy',
  'lunch',
  'breakfast',
  'world',
  'planet',
  'every',
  'about',
  'self',
  'other',
  'change',
  'system',
  'differ',
  'okay',
  'never',
  'story',
  'procedure',
  'letter',
  'code',
  'java',
  'script',
  'python',
  'pipeline',
  'omen',
  'open',
  'key',
  'lock',
  'solid',
  'gas',
  'love',
  'anyway',
  'war',
  'peace',
  'now',
  'future',
]

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
      {words.map((w, key) => (
        <Word
          disabled={key !== words.length - 1}
          key={`${key}${w.word}`}
          word={w}
          guess={handleGuess}
        />
      ))}
      <hr style={{ marginBottom: '5em' }} />
    </Container>
  )
}

export default App
