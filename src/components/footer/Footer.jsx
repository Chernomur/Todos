import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import FooterItem from "components/footer/footerItem/FooterItem";

import { deleteCompletedTasks } from "store/todo/actions";
import theme from "ui/styles/theme";
import constants from "utils/constants";

const Footer = (props) => {
  const itemsLeftTitle =
    `${props.activeCounter} item${props.activeCounter === 1 ? "" : "s"} left`;

  return (
    <StyledFooter>
      <span>{itemsLeftTitle}</span>

      <ul className="StyledFilter">
        {filterButtons.map(({ title, value }) => (
          <FooterItem
            key={value}
            value={value}
            title={title}
          />
        ))}
      </ul>

      {props.completedCounter > 0 && (
        <button className="StyledClearComplete" onClick={props.deleteCompletedTasks}>
          clear completed [{props.completedCounter}]
        </button>
      )}
    </StyledFooter>
  );
};

const filterButtons = [
  {
    title: "All",
    value: constants.ALL
  }, {
    title: "Active",
    value: constants.ACTIVE
  }, {
    title: "Completed",
    value: constants.COMPLETED
  }
];

const StyledFooter = styled.footer`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  background-color: ${theme.colors.task};
  max-width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  .StyledFilter{
    margin-left: 0;
    padding: 0;
  
    li {
      display: inline;
    }
  }
  
  .StyledClearComplete {
    outline: none;
    border: 0;
    background: transparent;
    cursor: pointer;
    
    :hover {
      background-color: ${theme.colors.mainBackground}
    }
  }
  
  @media (max-width: ${theme.screenSize.laptop}px) { 
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      "itemsLeft clearComplete"
      "filter filter";
    width: 100%;

    .StyledClearComplete {
      grid-area: clearComplete;
    }

    span {
      grid-area: itemsLeft;
    }

    .StyledFilter {
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

const connectFunction = connect(
  null, {
    deleteCompletedTasks
  }
);

export default connectFunction(Footer);
