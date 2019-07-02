import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { palette, size } from "styled-theme";
import { Block, StarRating } from "../../../components";

const ItemWrapper = styled.div`
  width: 100%;
  height: auto;
  background: ${palette("white", 0)};
  padding: 5px;
`;

const bgImage = ({ details }) => `url(${details.imgsrc})`;
const bgColor = ({ details }) => (details.status > 40 ? "green" : "orange");

const ImageWrapper = styled.div`
  width: auto;
  height: 200px;
  margin: 2px;
  text-align: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  background-image: ${bgImage};
`;

const TitleWrapper = styled.div`
  width: auto;
  margin: 2px;
  padding: 0px 5px;
  text-align: left;
  color: ${palette("grayscale", 0)};
`;

const CodeWrapper = styled.div`
  width: auto;
  height: auto;
  margin: 2px;
  padding: 0px 5px;
  font-size: ${size("s12px")};
  color: #ccc;
  display: flex;
  justify-content: space-between;
`;

const RatingWrapper = styled.div`
  width: auto;
  padding: 5px;
  margin: 2px;
  text-align: left;
  color: #ccc;
`;

const StatusWrapper = styled(Block)`
  color: #fff;
  position: absolute;
  right: 6px;
  padding: 0 8px;
  background-color: ${bgColor};
`;
const CatStatusWrapper = styled(Block)`
  color: #fff;
  position: relative;
  padding: 0 8px;
  background-color: ${bgColor};
  float: left;
  text-align: right;
  width: 54px;
`;
const CatProgressWrapper = styled(Block)`
  color: #fff;
  position: absolute;
  top: 0;
  margin-left: 25%;
  width: 108px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px 0 0 5px;
  box-shadow: 1px 1px 0 #cfcfcf;
  @media screen and (max-width: 400px) {
    margin-left: 10%;
  }
`;

const MenuIcon = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  position: absolute;
  right: 10px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
`;

const QuantityWrapper = styled.div`
  border-radius: 50%;
  position: absolute;
  right: 15px;
  bottom: 30%;
  text-align: center;
  font-size: 30px;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
`;
const CatQuantityWrapper = styled.div`
  position: absolute;
  width: 50px;
  text-align: center;
  left: 54px;
  color: #000;
`;

const ItemBox = ({
  palette,
  rating,
  reverse,
  transparent,
  addToCartClick,
  ...props
}) => {
  return (
    <ItemWrapper>
      <MenuIcon>
        <i className="fa fa-ellipsis-v" aria-hidden="true" />
      </MenuIcon>
      <ImageWrapper
        {...props}
        style={
          props.details.type === "floor"
            ? { backgroundPosition: "center center" }
            : { backgroundPosition: "left center" }
        }
      />
      {props.details.type === "shelf" && (
        <QuantityWrapper>
          <i className="fa fa-heart-o" />
          <span
            style={{
              fontSize: "12px",
              position: "absolute",
              top: "12px",
              left: "4px",
              width: "20px",
              textAlign: "center"
            }}
          >
            {props.details.quantity}
          </span>
        </QuantityWrapper>
      )}
      <TitleWrapper>{props.details.title}</TitleWrapper>
      <CodeWrapper>
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          {props.details.code}
        </span>
        {props.details.type === "shelf" && (
          <StatusWrapper {...props}>
            {props.details.status} {"%"}
          </StatusWrapper>
        )}
        {props.details.type === "floor" && (
          <CatProgressWrapper {...props}>
            <CatStatusWrapper {...props}>
              {props.details.status} {"%"}
            </CatStatusWrapper>
            <CatQuantityWrapper>34</CatQuantityWrapper>
          </CatProgressWrapper>
        )}
      </CodeWrapper>
      {rating && (
        <RatingWrapper>
          <StarRating
            editing={false}
            name={rating.name}
            value={rating.value}
            emptyStarColor={rating.emptyStarColor}
            starColor={rating.starColor}
            starCount={rating.starCount}
          />
        </RatingWrapper>
      )}
    </ItemWrapper>
  );
};
ItemBox.propTypes = {
  reverse: PropTypes.bool,
  details: PropTypes.object,
  transparent: PropTypes.bool,
  rating: PropTypes.shape({
    value: PropTypes.number.isRequired,
    emptyStarColor: PropTypes.string.isRequired,
    starColor: PropTypes.string.isRequired,
    starCount: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
  addToCartClick: PropTypes.func
};
export default ItemBox;
