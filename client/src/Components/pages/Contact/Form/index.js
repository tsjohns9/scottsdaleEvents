import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Fa, Button, Input } from 'mdbreact';
import axios from 'axios';

class ContactPage extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      companyName: '',
      contactEmail: '',
      number: '',
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleSubmit(e) {
    e.preventDefault();

    const { name, companyName, contactEmail, number, message } = this.state;

    const form = await axios.post('/api/form', {
      name,
      companyName,
      contactEmail,
      number,
      message
    });
  }

  render() {
    return (
      <Container>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
          <p className="text-center w-responsive mx-auto pb-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error amet numquam iure
            provident voluptate esse quasi, veritatis totam voluptas nostrum quisquam eum porro a
            pariatur veniam.
          </p>
          <Row>
            <Col md="9" className="md-0 mb-5">
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="name"
                        label="Your name"
                        name="name"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="companyName"
                        label="Company name"
                        name="companyName"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="contactEmail"
                        label="Your email"
                        name="contactEmail"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="text"
                        id="number"
                        label="Contact Number"
                        name="number"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="md-form mb-0">
                      <Input
                        type="textarea"
                        id="message"
                        label="Your message"
                        name="message"
                        onChange={this.handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </form>
              <div className="text-center text-md-left">
                <Button color="primary" size="md">
                  Send
                </Button>
              </div>
            </Col>
            <Col md="3" className="text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <Fa icon="map-marker" size="2x" className="blue-text" />
                  <p>Scottsdale, Arizona</p>
                </li>
                <li>
                  <Fa icon="phone" size="2x" className="blue-text mt-4" />
                  <p>+ 01 234 567 89</p>
                </li>
                <li>
                  <Fa icon="envelope" size="2x" className="blue-text mt-4" />
                  <p>contact@example.com</p>
                </li>
              </ul>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}

export default ContactPage;
