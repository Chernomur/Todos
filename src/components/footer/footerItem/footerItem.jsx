import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const FilterButton = styled.li`
a {
  color: black;
  text-decoration: none;
  padding: 8px;
  margin: 5px;
  border-radius: 10px;
  border:${(props) => (props.test ? "1px solid whitesmoke" : "1px solid lightgray")};
  background-color: ${(props) => (props.test ? "#f5f5f5" : "")};
}
:hover a{
 background-color: #989fc2
}
`;

const FooterItem = ({filter, title, value, onClick}) => {
  return (
    <FilterButton test={filter === value}>
      <a
        href={value}
        onClick={() => onClick(value)}
      >
        {title}
      </a>
    </FilterButton>
  );
};

FooterItem.propTypes = {
  filter: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func
};
FooterItem.defaultProps = {
  title: "",
  value: "",
  filter: "#all",
  onClick: () => null
};

export default FooterItem;
