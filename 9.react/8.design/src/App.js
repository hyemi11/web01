import { Container, Row, Col, Button, Badge, Alert } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const handleButtonClick = () => {
        alert('Button Clicked!');
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <Alert variant="primary" className="text-center">
                        <h1>React with Bootstrap</h1>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Badge bg="primary">Primary</Badge>
                    <Badge bg="secondary">Secondary</Badge>
                    <Badge bg="success">Success</Badge>
                    <Badge bg="danger">Danger</Badge>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={{ span: 4, offset: 4 }}>
                    <Button variant="success" size="lg" onClick={handleButtonClick}>
                        Click me
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
