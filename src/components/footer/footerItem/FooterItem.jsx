import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import theme from "ui/styles/theme";

const FooterItem = ({ filter, title, value, changeFilter }) => {
  const changeFilterClick = () => {
    changeFilter(value);
  };

  return (
    <FilterButton test={filter === value}>
      <a
        href={value}
        onClick={changeFilterClick}
      >
        {title}
      </a>
    </FilterButton>
  );
};

const FilterButton = styled.li`
  a {
    color: ${theme.colors.linkColor};
    text-decoration: none;
    padding: 8px;
    margin: 5px;
    border-radius: 10px;
    border:${(props) => (props.test ? "1px solid whitesmoke" : "1px solid lightgray")};
    background-color: ${(props) => (props.test ? theme.colors.backgroundColor : "")};
  }
  :hover a{
   background-color: ${theme.colors.hoverLinkColor}
  }
`;

FooterItem.propTypes = {
  filter: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  changeFilter: PropTypes.func
};
FooterItem.defaultProps = {
  title: "",
  value: "",
  filter: "#all",
  changeFilter: () => null
};

export default FooterItem;
