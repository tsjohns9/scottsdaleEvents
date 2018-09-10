/* eslint-disable */
import React from 'react';
import {
  Container,
  Collapse,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table
} from 'mdbreact';
import API from '../../../api/API';
import { Link } from 'react-router-dom';
import './Checkout.css';

class Summary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false,
      collapse: false,
      shippingCost: '',
      isActive: false,
      success: null,
      estimateId: null,
      loading: false,
      errorMsg: null
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggle = (result, id = null, errorMsg = null) => {
    this.setState({
      modal: !this.state.modal,
      success: result,
      estimateId: id,
      loading: false,
      errorMsg: errorMsg
    });
  };
  toggleCollapse() {
    this.setState({ collapse: !this.state.collapse });
  }

  submitButton = () => {
    this.setState({ loading: true });
    API.getEstimate(this.props.location.state)
      .then(result => {
        sessionStorage.setItem('activeCart', result.data.activeCart);
        this.toggle(true, result.data.estimateId);
      })
      .catch(error => {
        console.log(error.message);
        const err =
          error.message && error.message.includes('timeout')
            ? 'Connection timed out'
            : error.response.data.message;
        this.toggle(false, null, err);
      });
  };

  handleCheck = event => {
    this.setState({ isActive: event.target.checked });
  };

  submitHandler = event => {
    event.preventDefault();
    event.target.className += ' was-validated';
  };

  changeHandler = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  render() {
    const eventDetails = this.props.location.state;
    const detailsFirst = Object.keys(eventDetails.eventProps).slice(0, 6);
    const detailsSecond = Object.keys(eventDetails.eventProps).slice(6, 12);
    const detailsWill = Object.keys(eventDetails.eventProps).slice(12, 17);
    const detailsWillOBJ = Object.keys(eventDetails.eventProps)
      .slice(12, 17)
      .map((obj, index) => {
        return eventDetails.eventProps[obj];
      });
    console.log(detailsWillOBJ);
    return (
      <Container className="mt-5">
        <h3 style={{ marginTop: '80px' }} className="text-center mb-3">
          Summary
        </h3>
        <Row>
          <Col md="12">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">
                    <b>Items</b>
                  </th>
                  <th className="text-center">
                    <b>Quantity</b>
                  </th>
                  <th className="text-center">
                    <b>Price</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.location.state.cartProps.map((obj, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center">{obj.name}</td>
                      <td className="text-center">{obj.qty}</td>
                      <td className="text-center">${obj.total}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="text-center">{''} </td>
                  <td className="text-center">{''} </td>
                  <td className="text-center">
                    <b style={{ fontWeight: '600' }}>
                      Est. Subtotal: $
                      {this.props.location.state.cartProps.reduce(
                        (a, b) => a + parseInt(b.total),
                        0
                      )}{' '}
                    </b>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <h3 className="text-center mb-3">Event Details</h3>
        <Row>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">
                    <b>Event Details</b>
                  </th>
                  <th className="text-center">
                    <b>Your Event</b>
                  </th>
                </tr>
              </thead>

              <tbody>
                {detailsFirst.map((obj, index) => {
                  const camelCase = obj
                    .replace(/([A-Z])/g, ' $1')

                    .replace(/^./, function(str) {
                      return str.toUpperCase();
                    });
                  return (
                    <tr key={index}>
                      <td className="text-center">{camelCase}</td>
                      <td className="text-center">{eventDetails.eventProps[obj]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md="6">
            {' '}
            <Table>
              <thead className="blue-grey lighten-4">
                <tr>
                  <th className="text-center">
                    <b>Event Details</b>
                  </th>
                  <th className="text-center">
                    <b>Your Event</b>
                  </th>
                </tr>
              </thead>

              <tbody>
                {detailsSecond.map((obj, index) => {
                  const camelCase = obj
                    .replace(/([A-Z])/g, ' $1')

                    .replace(/^./, function(str) {
                      return str.toUpperCase();
                    });
                  return (
                    <tr key={index}>
                      <td className="text-center">{camelCase}</td>
                      <td className="text-center">{eventDetails.eventProps[obj]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        {detailsWillOBJ[0] != '' && (
          <div>
            <h3 className="text-center mb-3">Will Call Details</h3>

            <Row>
              <Col md="12">
                <Table>
                  <thead className="blue-grey lighten-4">
                    <tr>
                      <th className="text-center">
                        <b>Event Details</b>
                      </th>
                      <th className="text-center">
                        <b>Your Event</b>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {detailsWill.map((obj, index) => {
                      const camelCase = obj
                        .replace(/([A-Z])/g, ' $1')

                        .replace(/^./, function(str) {
                          return str.toUpperCase();
                        });
                      return (
                        <tr key={index}>
                          <td className="text-center">{camelCase}</td>
                          <td className="text-center">{eventDetails.eventProps[obj]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        )}

        <Row className="mt-6 text-center">
          <Col md="">
            <Button
              outline
              color="warning"
              onClick={this.toggleCollapse}
              style={{ marginBottom: '1rem' }}
            >
              Terms & Conditions
            </Button>
            <Collapse isOpen={this.state.collapse}>
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                cred nesciunt sapiente ea proident.
              </p>
            </Collapse>
            <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
              <div className="custom-control custom-checkbox animated jello mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customControlValidation1"
                  onChange={event => this.handleCheck(event)}
                  required
                />
                <label className="custom-control-label" htmlFor="customControlValidation1">
                  Agree To Terms and Conditions
                </label>
                <div className="invalid-feedback">You must agree before submitting.</div>
              </div>
              <Link
                to={{
                  pathname: '/checkout/event',
                  state: {
                    cartProps: this.props.location.state.cartProps,
                    eventProps: this.props.location.state.eventProps
                  }
                }}
              >
                <Button color="success" className="aButton" size="md">
                  Back
                </Button>
              </Link>
              <button
                className="btn btn-unique"
                disabled={!this.state.isActive || this.state.loading}
                onClick={this.submitButton}
              >
                {this.state.loading ? <i className="fa fa-spinner fa-spin" /> : 'Submit Order'}
              </button>
            </form>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal}>
          <Link to={`/`}>
            <ModalHeader toggle={this.toggle}>
              {this.state.success ? 'Thank you!' : 'Uh oh...'}
            </ModalHeader>{' '}
          </Link>
          <ModalBody>
            {this.state.success
              ? `We will be contacting you soon. Your estimate ID is: ${this.state.estimateId}`
              : this.state.errorMsg}
          </ModalBody>
          <ModalFooter>
            <Link to={`/`}>
              <Button className="aButton" onClick={this.toggle}>
                Close
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Summary;
