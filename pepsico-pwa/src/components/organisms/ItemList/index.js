import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { palette } from "styled-theme";
import { ItemBox } from "../../../components";
import { Row, Col } from "react-bootstrap";

const ItemListWrapper = styled.div`
  width: calc(100% - 10px);
  height: calc(100vh - 200px);
  padding: 5px;
  margin: 0 5px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const ItemList = props => {
  const {
    itemList,
    btnTransparent,
    btnReverse,
    btnPalette,
    itemClick,
    addToCartClick
  } = props;
  console.log("props .............. ", props);
  return (
    <ItemListWrapper>
      <Row>
        {itemList.map((item, key) => (
          <Col
            xs={6}
            md={4}
            lg={3}
            key={key}
            style={{ margin: "10px 0px 10px 0px", padding: "5px" }}
          >
            <ItemBox
              details={item.itemDetails}
              rating={item.itemRating}
              palette={btnPalette}
              transparent={btnTransparent}
              reverse={btnReverse}
              addToCartClick={addToCartClick}
              onClick={e => {
                itemClick(item.itemDetails);
              }}
            />
          </Col>
        ))}
      </Row>
    </ItemListWrapper>
  );
};

ItemList.propTypes = {
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      itemRating: PropTypes.shape({
        value: PropTypes.number.isRequired,
        emptyStarColor: PropTypes.string.isRequired,
        starColor: PropTypes.string.isRequired,
        starCount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
      }),
      itemDetails: PropTypes.shape({
        title: PropTypes.string,
        code: PropTypes.string,
        desc: PropTypes.string,
        status: PropTypes.number,
        quantity: PropTypes.number,
        thumbimgsrc: PropTypes.string,
        imgsrc: PropTypes.string,
        imggallery: PropTypes.arrayOf(PropTypes.string)
      })
    })
  ),
  btnTransparent: PropTypes.bool,
  btnReverse: PropTypes.bool,
  btnPalette: PropTypes.string,
  itemClick: PropTypes.func,
  addToCartClick: PropTypes.func
};
export default ItemList;
