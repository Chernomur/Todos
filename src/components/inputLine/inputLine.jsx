import React from "react";
import PropTypes from 'prop-types';

import style from "./inputLine.module.css"
import { TaskType } from "utils/types";

const InputLine = (props) => {
  const inputText = React.createRef();

  const addText = (e) => {
    const text = inputText.current.value;
    if (e.key === "Enter" && text !== "") {
      props.addTodo(text)
      inputText.current.value = '';
    }
  };

  return (
    <div className={style.headerInput}>
      {props.todolist.length > 0 && (
        <input
          type="checkbox"
          className={style.checkAll}
          onChange={props.checkAll}
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

// PropTypes.string
// PropTypes.number
// PropTypes.bool
// PropTypes.func
// PropTypes.node
// PropTypes.arrayOf(PropTypes.string)
// PropTypes.shape({
//   id: PropTypes.string
// })
// PropTypes.oneOf(['start', 'end'])
// PropTypes.oneOfType([PropTypes.string, PropTypes.number])

InputLine.propTypes = {
  todolist: PropTypes.arrayOf(TaskType),
  addTodo: PropTypes.func
}

InputLine.defaultProps = {
  todolist: [],
  addTodo: () => null
};

export default InputLine;
