import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImage,
  CardTitle,
  CardText,
  Col,
  Container,
  Fa,
  Row
} from 'mdbreact';
import InventoryCard from './InventoryCard';

const SubCategoryComponentWrapper = props => {
  const { inventory, image } = props;

  // grabs the current path
  const param = props.match.params.category;

  // will contain the subcategories, if there are any
  const subCategories = [];

  // grabs the sub categories. Even though this "isn't being used", its needed for getInvItems
  const getSubCategories = inventory
    ? inventory[param].map(a => {
        if (!subCategories.includes(a.subcategory)) {
          subCategories.push(a.subcategory);
        }
      })
    : null;

  // checks if there are no sub categories. if not, gets the inventory items.
  const getInvItems = subCategories.includes('') ? inventory[param].map(a => a) : null;

  // contains individual inventory items if there are no sub categories
  const itemsToRender = subCategories.length ? subCategories : null;

  return (
    <Container fluid>
      <Row>
        {itemsToRender && !getInvItems
          ? itemsToRender.map(a => (
              <Col key={a}>
                <Card>
                  <CardImage
                    top
                    src={image}
                    overlay="white-slight"
                    hover
                    waves
                    alt="Card image cap"
                  />
                  <CardBody className="elegant-color white-text rounded-bottom">
                    <a className="activator waves-effect waves-light mr-4">
                      <Fa icon="share-alt" />
                    </a>
                    <CardTitle>{a}</CardTitle>
                    <hr className="hr-light" />
                    <Link
                      to={`${props.match.url}/${a}`}
                      className="black-text d-flex justify-content-end"
                    >
                      <h5 className="white-text">
                        See more <Fa icon="angle-double-right" />
                      </h5>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            ))
          : null}

        {getInvItems
          ? getInvItems.map((a, i) => {
              console.log('a:', a);
              return (
                <Col md="4" key={i}>
                  <InventoryCard cardTitle={a.name} cardDesc={a.description} id={i} />
                  {console.log('a:', a)}
                </Col>
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default SubCategoryComponentWrapper;
