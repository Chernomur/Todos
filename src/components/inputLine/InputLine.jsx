import React from "react";
import PropTypes from "prop-types";

import { TaskType } from "utils/types";
import styled from "styled-components";
import theme from "ui/styles/theme";
import { connect } from "react-redux";
import { addTask, changeAllCheckbox } from "../../store/todo/actions";

const InputLine = (props) => {
  const inputText = React.createRef();

  const addText = (e) => {
    const text = inputText.current.value;
    if (e.key === "Enter" && text !== "") {
      props.addTask(text);
      inputText.current.value = "";
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
        ref={inputText}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  padding: 0 10px 0 10px;
  display: flex;
  background-color: ${theme.colors.task};
  width: 530px;
  height: 63px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: ${theme.windowSize.laptop}) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
 ::placeholder {
    color: ${theme.colors.placeholder};
 }
  border: none;
  width: 90%;
  height: 90%;
  font-size: 24px;
`;

const StyledCheckAll = styled.input`
  width: 50px;
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

const connectFunction = connect((state) => ({
  todoData: state.todo.todoData
}), {
  addTask,
  changeAllCheckbox
});

export default connectFunction(InputLine);
