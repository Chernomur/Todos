import React from "react";

import ListItem from "./listItem/listItem";

import style from "./todoList.module.css"

const TodoList = (props) => {
  return (
    <div className={style.todoList}>
      <ul>
        {props.filterTodo().map((item) => (
          // Move inside the VVVV component VVVV
          <li key={item.id}>
            <ListItem
              id={item.id}
              check={item.check}
              text={item.text}
              updateCheckBox={props.updateCheckBox}
              updateTodo={props.updateTodo}
              deleteItem={props.deleteItem}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
