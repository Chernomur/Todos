import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import theme from "ui/styles/theme";
import { connect } from "react-redux";
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
      test={filter === value}>

      {title}
    </FilterButton>
  );
};

const FilterButton = styled.li`
  color: ${theme.colors.link};
  text-decoration: none;
  padding: 8px;
  margin: 5px;
  border-radius: 10px;
  border: ${(props) => (props.test ? "1px solid whitesmoke" : "1px solid lightgray")};
  background-color: ${(props) => (props.test ? theme.colors.mainBackground : "")};
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

const connectFunction = connect((state) => ({
  filter: state.filter.filter
}),
{
  changeFilter
});
export default connectFunction(FooterItem);
