import React from "react";
import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import destinationsData from "./data/destinations.json";

/**
 * The main App component.
 *
 * This component renders the entire application. It is a functional component,
 * meaning that it does not have its own state or lifecycle methods.
 *
 * The App component renders the following components:
 * * A Navbar component with links to the Home and Packages sections.
 * * A Home section with a background image and a call-to-action (CTA) button.
 * * A Packages section with a list of cards, each representing a travel package.
 *   Each card has a title, description, and Book Now button.
 *   When the Book Now button is clicked, a modal window is displayed with a form
 *   to book the package.
 * * A Footer section with a copyright notice and a link to the author's website.
 *
 * @return {JSX.Element} The rendered App component.
 */
function App() {
  const [show, setShow] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = () => setShow(false);

  const handleShow = (card) => {
    setSelectedCard(card);
    setShow(true);
  };

  const { destinations } = destinationsData;

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-primary">
            Traveland
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="mx-2">
                Home
              </Nav.Link>
              <Nav.Link href="#destinations" className="mx-2">
                Packages
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home Section */}
      <section
        className="d-flex align-items-center justify-content-center text-white home-section"
        id="home"
      >
        <div className="text-center">
          <h1 className="display-4 fw-bold mb-4">Explore the World with Us</h1>
          <p className="lead mb-4">Your dream vacation is just a click away.</p>
          <Button variant="primary" size="lg" href="#destinations">
            View Packages
          </Button>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Destinations</h2>
          <Row>
            {destinations.map((card) => (
              <Col key={card.id} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    className="card-img-top"
                    src={card.image}
                  />
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.description}</Card.Text>
                    <Button variant="primary" onClick={() => handleShow(card)}>
                      Book Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        className="form-modal"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title className="h4">{selectedCard?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="form-container">
            <iframe
              key={selectedCard?.id}
              src={`https://api.leadconnectorhq.com/widget/form/u3Me1IECEl7t2x0f0HlU?location=${encodeURIComponent(
                selectedCard?.title || ""
              )}`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                borderRadius: "3px",
              }}
              id="inline-u3Me1IECEl7t2x0f0HlU"
              title="travel_info_form"
            />
            <script src="https://link.msgsndr.com/js/form_embed.js"></script>
          </div>
        </Modal.Body>
      </Modal>

      {/* Footer Section */}
      <footer className="bg-dark text-white py-4" id="footer">
        <Container>
          <div className="text-center">
            <h3 className="fw-bold mb-3">Traveland</h3>
            <p className="mb-2">All rights reserved.</p>
            <p className="mb-0">Made with ❤️ by Rosa Guevara</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
