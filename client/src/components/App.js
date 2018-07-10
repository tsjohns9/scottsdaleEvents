import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import InventoryPage from './pages/Inventory';
import API from '../api/API';
import Gallery from './pages/Gallery';

class App extends Component {
  constructor(props) {
    super(props);
    this.categories = this.loadCategories();
    this.state = { categories: this.categories };
  }

  loadCategories = () => {
    return API.getInventoryCategories()
      .then(result => {
        const arr = result.data.map(index => index['CATEGORY']);
        return this.setState({ categories: arr });
      })
      .catch(error => error);
  };

  loadInventoryItems = () => {
    API.getInventoryItems()
      .then(result => {
        const { data } = result;
        console.log(data);
      })
      .catch(error => console.log(error));
  };

  render() {
    this.loadInventoryItems();
    const { categories } = this.state;
    return (
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home {...props} categories={categories} />}
            />
            <Route
              path="/inventory"
              render={props => (
                <InventoryPage {...props} categories={categories} />
              )}
            />
            <Route
              path="/gallery"
              render={props => <Gallery {...props} categories={categories} />}
            />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;

// <Route path='/inventory' component={inventory}/>
