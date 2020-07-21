import React from "react";
import PropTypes from "prop-types";

import { TaskType } from "utils/types";
import style from "./inputLine.module.css";

const InputLine = (props) => {
  const inputText = React.createRef();

  const addText = (e) => {
    const text = inputText.current.value;
    if (e.key === "Enter" && text !== "") {
      props.addTodo(text);
      inputText.current.value = "";
    }
  };

  return (
    <div className={style.headerInput}>
      {props.todolist.length > 0 && (
        <input
          type="checkbox"
          className={style.checkAll}
          onChange={props.checkAll}
          checked={props.activeCounter === 0}
        />
      )}

      <input
        id="new-todo"
        className={style.newTodo}
        placeholder="What needs to be done?"
        autoFocus
        onKeyDown={addText}
        ref={inputText}
      />
    </div>
  );
};

InputLine.propTypes = {
  activeCounter: PropTypes.number,
  todolist: PropTypes.arrayOf(TaskType),
  addTodo: PropTypes.func,
  checkAll: PropTypes.func
};

InputLine.defaultProps = {
  activeCounter: 0,
  todolist: [],
  addTodo: () => null,
  checkAll: () => null
};

export default InputLine;
