import React from "react";
import s from "./inputLine.module.css"

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
        {props.todolist.length > 0 ? <input type="checkbox" className={s.checkAll} onChange={props.checkAll}/> : ""}
        <input id="new-todo" className={s.newTodo} placeholder="What needs to be done?" autoFocus=""
               onKeyDown={addText}
               ref={inputText}
        />
      </div>
  )
}
export default InputLine;