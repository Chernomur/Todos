import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "ui/styles/theme";

import FooterItem from "./footerItem/FooterItem.jsx";

const Footer = (props) => {
  return (
    <FooterSC>
      <ItemsLeftSC>
        {props.activeCounter === 1 ?
          `${props.activeCounter} item left`
          : `${props.activeCounter} items left`}
      </ItemsLeftSC>

      <FilterSC>
        <FooterItem
          value="#all"
          title="All"
          changeFilter={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allactive"
          title="Active"
          changeFilter={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allcompleted"
          title="Completed"
          changeFilter={props.changeFilter}
          filter={props.filter}
        />
      </FilterSC>

      {props.completedCounter > 0 && (
        <ClearCompleteSC
          onClick={props.deleteCompletedTasks}
        >
          clear completed [{props.completedCounter}]
        </ClearCompleteSC>
      )}
    </FooterSC>
  );
};

const ItemsLeftSC = styled.span`
@media (${theme.windowSize.mobile}) {
  .itemsLeft {
    grid-area: itemsLeft;
  } 
}`;

const ClearCompleteSC = styled.button`
  outline: none;
  border: 0;
  background: transparent;
`;

const FilterSC = styled.ul`
  margin-left: 0;
  padding: 0;
  
  li {
    display: inline;
  }
`;

const FooterSC = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  background-color: ${theme.colors.taskColor};
  width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

@media (${theme.windowSize.mobile}) { 
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
      "itemsLeft clearComplete"
      "filter filter";
  align-items: center;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ${ClearCompleteSC} {
    grid-area: clearComplete;
  }

  ${FilterSC} {
    grid-area: filter;
  }
}`;

Footer.propTypes = {
  activeCounter: PropTypes.number,
  deleteCompletedTasks: PropTypes.func,
  completedCounter: PropTypes.number,
  changeFilter: PropTypes.func,
  filter: PropTypes.string
};

Footer.defaultProps = {
  activeCounter: 0,
  deleteCompletedTasks: () => null,
  completedCounter: 0,
  changeFilter: () => null,
  filter: "#all"
};

export default Footer;
