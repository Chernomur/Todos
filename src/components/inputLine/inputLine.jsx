import React from "react";
import s from "./inputLine.module.css"
import TodoList from "../todoList/todoList";

const InputLine = (props) => {

  const inputText = React.createRef();
  const addText = (e) => {
    const text = inputText.current.value;
    if (e.key === "Enter" && text !== "") {

      props.addTodo(text)
      inputText.current.value = '';
    }

  }

  return (
      <div className={s.headerInput}>
        <button className={s.checkAll} onClick={props.checkAll}>⌵</button>
        <input id="new-todo" className={s.newTodo} placeholder="What needs to be done?" autoFocus=""
               onKeyDown={addText}
               ref={inputText}
        />

      </div>
  )
}
export default InputLine;