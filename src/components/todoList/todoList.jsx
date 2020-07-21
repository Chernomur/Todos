import React from "react";

import PropTypes from "prop-types";
import ListItem from "./listItem/listItem.jsx";

import style from "./todoList.module.css";
import { TaskType } from "../../utils/types";

const TodoList = (props) => {
  return (
    <div className={style.todoList}>
      <ul>
        {props.tasks.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            showInput={item.showInput}
            check={item.check}
            text={item.text}
            updateCheckBox={props.updateCheckBox}
            updateTodo={props.updateTodo}
            deleteItem={props.deleteItem}
          />
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  updateCheckBox: PropTypes.func,
  updateTodo: PropTypes.func,
  deleteItem: PropTypes.func,
  tasks: PropTypes.arrayOf(TaskType)
};

TodoList.defaultProps = {
  updateCheckBox: () => null,
  updateTodo: () => null,
  deleteItem: () => null,
  tasks: []
};

export default TodoList;
