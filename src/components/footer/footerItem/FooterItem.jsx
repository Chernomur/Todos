import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import theme from "ui/styles/theme";
import { changeFilter } from "store/filter/actions";

const FooterItem = ({ filter, title, value, changeFilter }) => {
  const changeFilterClick = () => {
    changeFilter(value);
    window.location.hash = value;
  };

  return (
    <FilterButton
      href={value}
      onClick={changeFilterClick}
      selected={filter === value}
    >
      {title}
    </FilterButton>
  );
};

const FilterButton = styled.li`
  color: ${theme.colors.link};
  padding: 8px;
  margin: 5px;
  border-radius: 10px;
  border: ${(props) => (props.selected ? "1px solid whitesmoke" : "1px solid lightgray")};
  background-color: ${(props) => (props.selected ? theme.colors.mainBackground : "")};
  cursor: pointer;
  
  :hover {
    background-color: ${theme.colors.hoverLink}
  }
`;

FooterItem.propTypes = {
  filter: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.string,
  changeFilter: PropTypes.func.isRequired
};
FooterItem.defaultProps = {
  title: "",
  value: ""
};

const connectFunction = connect(
  (state) => ({ filter: state.filter.filter }),
  { changeFilter }
);

export default connectFunction(FooterItem);
