import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MusicPlayer from "./Music/MusicPlayer";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card.Body>
            <Card.Title>리액트 웹사이트</Card.Title>
            <Card.Text>리액트와 부트스랩을 활용한 웹사이트</Card.Text>
            <Link to="/movie">
              <Button variant="primary">MoviesList</Button>
            </Link>
            <Link to="/weathersearch">
              <Button variant="primary">WeatherSearch</Button>
            </Link>
            <Link to="/weather">
              <Button variant="primary">Weather</Button>
            </Link>
            <Link to="/music">
              <Button variant="primary">Music Play</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
