import React from "react";
import s from "./todoList.module.css"
import ListItem from "./listItem/listItem";

const TodoList = (props) => {



  return (
      <div className={s.todoList}>
        <ul>
          {props.filterTodo().map(item => (
              <li key={item.id}><ListItem id={item.id} check={item.check} text={item.text}
                                          updateCheckBox={props.updateCheckBox}
                                          updateTodo={props.updateTodo}
                                          deleteItem={props.deleteItem}
              /></li>))}
        </ul>
      </div>
  )
}

export default TodoList;
