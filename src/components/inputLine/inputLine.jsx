import React from "react";
import PropTypes from "prop-types";

import {TaskType} from "utils/types";
import styled from "styled-components";

const HeaderInputSC = styled.div`
  padding: 0 10px 0 10px;
  display: flex;
  background-color: #fefefe;
  width: 530px;
  height: 63px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    display: flex;
    background-color: #fefefe;
    width: 100%;
    height: 63px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
`;
const NewTodoSC = styled.input`
  border: none;
  width: 90%;
  height: 90%;
  font-size: 24px;
`;

const CheckAllSC = styled.input`
  width: 8%;
  height: 80%;
  `;

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
    <HeaderInputSC>
      {props.todoData.length > 0 && (
        <CheckAllSC
          type="checkbox"
          onChange={props.changeAllCheckbox}
          checked={props.activeCounter === 0}
        />
      )}

      <NewTodoSC
        id="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={addText}
        ref={inputText}
      />
    </HeaderInputSC>
  );
};

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
