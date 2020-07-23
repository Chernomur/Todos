import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import FooterItem from "./footerItem/footerItem.jsx";

const ItemsLeftSC = styled.span`
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px){
    .itemsLeft {
      grid-area: itemsLeft;
    } 
  }
`;

const ClearCompleteSC = styled.button`
  outline: none;
  border: 0;
  background: transparent;
`;

const FilterSC = styled.ul`
  margin-left: 0px;
  padding: 0px;
  
  li {
    display: inline;
  }
`;

const FooterSC = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  background-color: #fefefe;
  width: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
        "itemsLeft clearComplete"
        "filter filter";
    align-items: center;
    background-color: #fefefe;
    width: 100%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    
      ${ClearCompleteSC} {
    grid-area: clearComplete;
  }

  ${FilterSC} {
    grid-area: filter;
  }
  }
`;

const Footer = (props) => {
  return (
    <FooterSC>
      <ItemsLeftSC>
        {props.activeCounter === 1 ? `${props.activeCounter} item left` : `${props.activeCounter} items left`}
      </ItemsLeftSC>

      <FilterSC>
        <FooterItem
          value="#all"
          title="All"
          onClick={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allactive"
          title="Active"
          onClick={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allcompleted"
          title="Completed"
          onClick={props.changeFilter}
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
