import { useState } from 'react'

import './App.css'
import CalculadoraBasica from './components/CalculadoraBasica';
import { Container } from 'react-bootstrap';



function App() {

  return (
   <Container className="py-4">
    <h1 className="text-center mb-4">🏆 Prácticas - Lenguajes Visuales</h1>
          <CalculadoraBasica />
   </Container>
  )
}

export default App