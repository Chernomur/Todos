import React from "react";

import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "ui/styles/theme";

import { connect } from "react-redux";
import { deleteCompletedTasks } from "store/todo/actions";
import FooterItem from "./footerItem/FooterItem.jsx";
import constants from "../../utils/constants";

const Footer = (props) => {
  const itemsLeftTitle = `${props.activeCounter} item${props.activeCounter === 1 ? "" : "s"} left`;

  return (
    <StyledFooter>
      <StyledItemsLeft>
        {itemsLeftTitle}
      </StyledItemsLeft>

      <StyledFilter>
        <FooterItem
          value={constants.all}
          title="All"
        />
        <FooterItem
          value={constants.active}
          title="Active"
        />
        <FooterItem
          value={constants.completed}
          title="Completed"
        />
      </StyledFilter>

      {props.completedCounter > 0 && (
        <StyledClearComplete
          onClick={props.deleteCompletedTasks}
        >
          clear completed [{props.completedCounter}]
        </StyledClearComplete>
      )}
    </StyledFooter>
  );
};

const StyledItemsLeft = styled.span`
  @media (max-width: ${theme.windowSize.laptop}) {
    .itemsLeft {
      grid-area: itemsLeft;
    } 
  }
`;

const StyledClearComplete = styled.button`
  outline: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  
  :hover {
    background-color: ${theme.colors.mainBackground}
  }
`;

const StyledFilter = styled.ul`
  margin-left: 0;
  padding: 0;
  
    li {
      display: inline;
    }
`;

const StyledFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  background-color: ${theme.colors.task};
  width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.windowSize.laptop}) { 
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "itemsLeft clearComplete"
      "filter filter";
    width: 100%;

    ${StyledClearComplete} {
      grid-area: clearComplete;
    }

    ${StyledFilter} {
      grid-area: filter;
    }
  }
`;

Footer.propTypes = {
  activeCounter: PropTypes.number,
  deleteCompletedTasks: PropTypes.func.isRequired,
  completedCounter: PropTypes.number
};

Footer.defaultProps = {
  activeCounter: 0,
  completedCounter: 0
};

const connectFunction = connect(null, {
  deleteCompletedTasks
});
export default connectFunction(Footer);
