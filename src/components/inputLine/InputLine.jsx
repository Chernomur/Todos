import React from "react";
import PropTypes from "prop-types";

import { TaskType } from "utils/types";
import styled from "styled-components";
import theme from "ui/styles/theme";

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
        <CheckAllSC
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
  background-color: ${theme.colors.taskColor};
  width: 530px;
  height: 63px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  @media (${theme.windowSize.mobile}) {
    width: 100%;
  }
`;

const StyledInput = styled.input`
 ::placeholder {
  color: ${theme.colors.placeholderColor};
 }
  border: none;
  width: 90%;
  height: 90%;
  font-size: 24px;
`;

const CheckAllSC = styled.input`
  width: 8%;
  height: 80%;
`;

InputLine.propTypes = {
  activeCounter: PropTypes.number,
  todoData: PropTypes.arrayOf(TaskType),
  addTask: PropTypes.func,
  changeAllCheckbox: PropTypes.func
};

InputLine.defaultProps = {
  activeCounter: 0,
  todoData: [],
  addTask: () => null,
  changeAllCheckbox: () => null
};

export default InputLine;
