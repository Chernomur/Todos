import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { addTask, changeAllCheckbox } from "store/todo/actions";
import { TaskType } from "utils/types";
import theme from "ui/styles/theme";

const InputLine = (props) => {
  const addText = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      props.addTask(e.target.value);
      e.target.value = "";
    }
  };

  return (
    <StyledHeader>
      {props.todoData.length > 0 && (
        <StyledCheckAll
          type="checkbox"
          onChange={props.changeAllCheckbox}
          checked={props.activeCounter === 0}
        />
      )}

      <StyledInput
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={addText}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  margin: 0 auto;
  padding: 0;
  display: flex;
  background-color: ${theme.colors.task};
  max-width: 550px;
  height: 63px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.screenSize.laptop}px) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
  ::placeholder {
    color: ${theme.colors.placeholder};
  }
 
  border: none;
  width: 500px;
  height: 90%;
  font-size: 24px;
`;

const StyledCheckAll = styled.input`
  min-width: 50px;
  max-width: 50px;
  height: 50px;
  cursor: pointer;
`;

InputLine.propTypes = {
  activeCounter: PropTypes.number,
  todoData: PropTypes.arrayOf(TaskType).isRequired,
  addTask: PropTypes.func.isRequired,
  changeAllCheckbox: PropTypes.func.isRequired
};

InputLine.defaultProps = {
  activeCounter: 0
};

const connectFunction = connect(
  (state) => ({
    todoData: state.todo.todoData
  }),
  {
    addTask,
    changeAllCheckbox
  }
);

export default connectFunction(InputLine);
