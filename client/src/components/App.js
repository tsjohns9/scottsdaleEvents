import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import API from '../api/API';
import Gallery from './pages/Gallery';
import ContactUs from './pages/Contact/Form/index';
import CustomerLogin from './pages/CustomerLogin';
// import AboutPage from './pages/About';
import ShoppingCart from './pages/ShoppingCart';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { inventoryObj: null, subCategories: null };
  }

  componentDidMount() {
    this.setState({
      inventoryObj: this.loadCategoryProducts()
    });
  }

  loadCategoryProducts = category => {
    API.getCategoryProducts(category)
      .then(result => {
        const { data } = result;
        // will hold filtered data
        const inventoryObj = {};

        // loops through each inventory item
        // creates a unique key on the inventoryObj object based on the inventory category
        // each value is an array of objects
        // each index in the array is the unique inventory item
        data.forEach(value => {
          // declare the variables
          let category, rest;

          // destructure so that category and the rest of the values are split apart
          ({ category, ...rest } = value);

          // checks if the category has been created, if not, creates the key
          if (!inventoryObj[value['category']]) {
            // creates an object to hold the first value
            const obj = {};

            // each key value is an array of objects. puts the first object inside the array
            inventoryObj[value['category']] = [(obj[category] = rest)];
          } else {
            // runs when a category already exists.
            // adds the inventory item to the array for its unique category
            inventoryObj[value['category']].push(rest);
          }
        });

        // will hold the unique sub categories for each category
        const subCategories = {};

        // gets the keys (categories) from inventoryObj
        // creates a key on subCategories for each category
        // each value is an array of sub categories.

        const categories = Object.keys(inventoryObj);

        categories.forEach(a => {
          subCategories[a] = [
            ...new Set(inventoryObj[a].map(b => b.subcategory))
          ];
        });

        return this.setState({ inventoryObj, subCategories, categories });
      })
      .catch(error => {
        console.error(error);
      });
  };

  // loads the inventory categories for the nav bar
  // loadCategories = () => {
  //   return API.getDistinctCategories()
  //     .then(result => {
  //       const arr = result.data.map(index => index['category']);
  //       return this.setState({ categories: arr });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       this.setState({ error: '500 (Internal Server Error)' });
  //     });
  // };

  render() {
    const { categories, subCategories, inventoryObj } = this.state;

    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/inventory"
              render={props => (
                <InventoryPage
                  {...props}
                  categories={categories}
                  subCategories={subCategories}
                  inventoryObj={inventoryObj}
                />
              )}
            />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/login" component={CustomerLogin} />
            <Route exact path="/contact" component={ContactUs} />
            <Route exact path="/cart" component={ShoppingCart} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
