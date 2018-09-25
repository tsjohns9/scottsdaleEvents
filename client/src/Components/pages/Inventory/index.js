/* eslint-disable */
import './InventoryPage.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoryComponentWrapper from './CategoryComponentWrapper';
import SubCategoryComponentWrapper from './SubCategoryComponentWrapper';
import InventoryComponentWrapper from './InventoryComponentWrapper';
import Sidebar from './Sidebar';
import { Container, Fa, Card, Row } from 'mdbreact';
import ShowPageComponentWrapper from './ShowPageComponentWrapper';
import { Link } from 'react-router-dom';
// The main functionality of this component is to render the specified routes for the inventory
// Similiar to App.js. It routes requests to the appropriate component, and serves as a parent component

// gets the screen size from the window object
const mql = window.matchMedia(`(min-width: 992px)`);

export const CartValueContext = React.createContext();

class InventoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      docked: false,
      totalCost: sessionStorage.getItem('cartTotal')
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    mql.addListener(this.mediaQueryChanged);
    this.mediaQueryChanged();
    document.addEventListener('click', this.closeSideNavClick, false);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
    document.removeEventListener('click', this.closeSideNavClick);
  }

  // the sidebar is hidden on smaller screens. This is used to toggle the hidden sidebar for small screens.
  openSidebarOverlay = () => {
    if (this.state.sidebarOpen === false) {
      this.setState({ sidebarOpen: true });
    } else {
      this.setState({ sidebarOpen: false });
    }
  };

  // if the screen size greater than or equal to the size set in mql,
  // open the sidebar, and dock it (fix in place)
  // otherwise, close it, and do not dock it (display it as an overlay)
  mediaQueryChanged = () => {
    return mql.matches
      ? this.setState({ sidebarOpen: true, docked: true })
      : this.setState({ sidebarOpen: false, docked: false });
  };

  // used to close the sidebar when an event click occurs outside of it while it is undocked, and opened
  closeSideNavClick = e => {
    const target = e.target.getAttribute('class');
    if (target !== 'fa fa-bars' && this.state.sidebarOpen && !this.state.docked) {
      this.setState({ sidebarOpen: false });
    }
  };

  render() {
    const { categories, inventoryObj, subCategories } = this.props;

    const categoryImgs =
      categories && inventoryObj ? categories.map(a => inventoryObj[a][0].url) : null;
    return (
      <div className="d-lg-flex">
        <Sidebar
          {...this.props}
          sidebarOpen={this.state.sidebarOpen}
          subCategories={subCategories}
        />
        <Container fluid className="ml-270">
          <div className="open-sidebar">
            <i
              onClick={this.openSidebarOverlay}
              className="fa fa-bars"
              style={{ fontSize: '24px', cursor: 'pointer' }}
            />
          </div>
          <div className="inv-wrapper">
            <CartValueContext.Provider
              value={total => {
                sessionStorage.setItem('cartTotal', total);
                this.setState({ totalCost: total });
              }}
            >
              <Card className="col-sm-3 col-xs-3 col-md-1  text-center">
                <Link className="text-center" to={{ pathname: '/checkout/cart' }}>
                  <Fa icon="shopping-cart" size="2x" className="text-center">
                    {' '}
                    <h4 className="text-center">
                      {sessionStorage.getItem('cartTotal') && '$' + this.state.totalCost}
                    </h4>
                  </Fa>
                </Link>
              </Card>

              <Switch>
                <Route
                  exact
                  path={this.props.match.path}
                  render={props => (
                    <CategoryComponentWrapper
                      {...props}
                      categories={categories}
                      images={categoryImgs}
                    />
                  )}
                />
                <Route
                  exact
                  path={`${this.props.match.path}/:category`}
                  render={props => (
                    <SubCategoryComponentWrapper {...props} inventory={inventoryObj} />
                  )}
                />
                <Route
                  exact
                  path={`${this.props.match.path}/:category/:subcategory`}
                  render={props => (
                    <InventoryComponentWrapper {...props} inventory={inventoryObj} />
                  )}
                />
                <Route
                  exact
                  path={`${this.props.match.path}/:category/:subcategory/:name`}
                  render={props => <ShowPageComponentWrapper {...props} inventory={inventoryObj} />}
                />
              </Switch>
            </CartValueContext.Provider>
          </div>
        </Container>
      </div>
    );
  }
}

export default InventoryPage;
