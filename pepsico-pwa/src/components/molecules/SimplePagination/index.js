import React from "react";
import "./index.scss";
import { Pagination } from "react-bootstrap";

const SimplePagination = ({ ...props }) => {
  const {
    bsPrefix,
    style,
    title,
    onSelectPagination,
    currentPageNumber,
    totalPages
  } = props;
  const nextStyle = totalPages === currentPageNumber ? "disabled" : "";
  const prevStyle = currentPageNumber === 1 ? "disabled" : "";
  return (
    <Pagination bsPrefix={bsPrefix} style={style}>
      <Pagination.Prev
        onClick={() => onSelectPagination(currentPageNumber - 1)}
        disabled={prevStyle}
      />
      <div style={{ width: "100%", textAlign: "center" }}>{title}</div>
      <Pagination.Next
        onClick={() => onSelectPagination(currentPageNumber + 1)}
        disabled={nextStyle}
      />
    </Pagination>
  );
};

export default SimplePagination;
