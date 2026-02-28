import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';

const CalculadoraBasica = () => {
  // Variables de estado
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operacion, setOperacion] = useState('+');
  const [resultado, setResultado] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Operadores disponibles
  const operadores = [
    { simbolo: '+', nombre: 'Suma' },
    { simbolo: '-', nombre: 'Resta' },
    { simbolo: '*', nombre: 'Multiplicación' },
    { simbolo: '/', nombre: 'División' },
    { simbolo: '%', nombre: 'Módulo' }
  ];

  // Función para realizar el cálculo
  const calcular = () => {
    setError('');
    setResultado(null);

    // Validar entrada
    if (num1 === '' || num2 === '') {
      setError('Ambos números son requeridos');
      return;
    }

    // Convertir a números (tipos de datos)
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    // Validar conversión
    if (isNaN(a) || isNaN(b)) {
      setError('Debes ingresar números válidos');
      return;
    }

    // Realizar operación según el operador seleccionado
    let resultadoCalculo;
    switch (operacion) {
      case '+':
        resultadoCalculo = a + b;
        break;
      case '-':
        resultadoCalculo = a - b;
        break;
      case '*':
        resultadoCalculo = a * b;
        break;
      case '/':
        if (b === 0) {
          setError('No se puede dividir entre cero');
          return;
        }
        resultadoCalculo = a / b;
        break;
      case '%':
        resultadoCalculo = a % b;
        break;
      default:
        resultadoCalculo = 0;
    }

    // Redondear si es necesario
    resultadoCalculo = parseFloat(resultadoCalculo.toFixed(6));
    setResultado(resultadoCalculo);
  };

  // Limpiar todo
  const limpiar = () => {
    setNum1('');
    setNum2('');
    setOperacion('+');
    setResultado(null);
    setError('');
  };

  return (
    <Card className="shadow mt-4">
      <Card.Header className="bg-info text-white">
        <h3>Práctica 2: Calculadora Básica</h3>
        <small>Operadores, Tipos de Datos y Control de Flujo</small>
      </Card.Header>
      <Card.Body>
        <Form>
          <Row className="mb-3">
            <Col md={5}>
              <Form.Group>
                <Form.Label>Primer número:</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Ej: 10.5"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Operación:</Form.Label>
                <Form.Select
                  value={operacion}
                  onChange={(e) => setOperacion(e.target.value)}
                >
                  {operadores.map((op, index) => (
                    <option key={index} value={op.simbolo}>
                      {op.simbolo} ({op.nombre})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Label>Segundo número:</Form.Label>
                <Form.Control
                  type="number"
                  step="any"
                  placeholder="Ej: 3.2"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          {error && <Alert variant="danger">{error}</Alert>}

          <div className="d-flex gap-2 mb-4">
            <Button variant="primary" onClick={calcular}>
              Calcular
            </Button>
            <Button variant="outline-secondary" onClick={limpiar}>
              Limpiar Todo
            </Button>
            </div>
            {resultado !== null && (
                <Alert variant="success">
                    <h4>Resultado: {resultado}</h4>
                </Alert>
            )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CalculadoraBasica;   