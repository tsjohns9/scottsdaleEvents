import React, { Component } from 'react';
import { Container, Table, Input, Button } from 'mdbreact';
import API from '../../../api/API';

// const styles = {
//   fontSize: 8
// };

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { products: null };
  }

  componentDidMount() {
    this.setState({
      products: [
        {
          id: '1',
          name: 'Firepit Bench',
          qty: '2',
          price: '35.00',
          total: '70.00'
        },
        {
          id: '2',
          name: 'Descansa Bench Short',
          qty: '2',
          price: '35.00',
          total: '70.00'
        },
        {
          id: '3',
          name: 'Some other thing',
          qty: '4',
          price: '65.00',
          total: '70.00'
        }
      ]
    });
  }

  onChange = e => {
    // gets the name and value from the input field
    const { name } = e.target;
    let { value } = e.target;
    // gets the current state which contains the products
    const { products } = this.state;

    // ensures only numbers are passed in
    if (isNaN(value.slice(-1))) {
      value = value.replace(/[^0-9]+/g, '');
    }

    // updates the appropriate object with the new quantity and price
    const updated = products.map(a => {
      if (a.name === name) {
        a.qty = value;
        a.total = Number(a.price) * Number(value);
      }
      return a;
    });

    this.setState({ products: updated });
  };

  onClick = e => {
    const copy = [...this.state.products];
    const { name } = e.target;

    const updated = copy
      .map(a => {
        if (a.name !== name) {
          return a;
        }
      })
      .filter(a => a !== undefined);

    console.log(updated);
    this.setState({ products: updated });
    // TODO: call method to delete product from cart table
    // return new cart inventory and re-render
  };

  onSubmit = () => {
    API.getEstimate(this.state)
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state);
    const { products } = this.state;

    return (
      <Container className="mt-3">
        <Table>
          <thead className="blue-grey lighten-4">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((a, i) => {
                return (
                  <tr key={a.name}>
                    <th scope="row">
                      {a.name}
                      <br />
                      <br />
                      <a
                        name={a.name}
                        className={`text-danger`}
                        onClick={this.onClick}
                      >
                        Remove
                      </a>
                    </th>
                    <td>
                      <Input
                        onChange={this.onChange}
                        name={a.name}
                        label="Quantity"
                        value={products[i].qty}
                        size="sm"
                      />
                    </td>
                    <td>{products[i].price}</td>
                    <td>{products[i].total}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <div className="text-right">$1200</div>
        <Button color="success" onClick={this.onSubmit}>
          Submit
        </Button>
      </Container>
    );
  }
}

export default ShoppingCart;
