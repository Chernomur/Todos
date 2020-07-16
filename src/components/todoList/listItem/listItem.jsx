import React from "react";

import style from "./ListItem.module.css";

const ListItem = (props) => {
  const inputText = React.createRef();

  const updateText = () => {
    const text = inputText.current.value;
    props.updateTodo(props.id, text)
  }

  return (
    <div className={style.listItem}>
      <input
        onChange={() => props.updateCheckBox(props.id)}
        type="checkbox"
        className={style.check}
        checked={props.check}
      />

      <input
        onChange={updateText}
        className={style.todo}
        value={props.text}
        ref={inputText}
      />

      <button
        className={style.deleteTodo}
        onClick={() => props.deleteItem(props.id)}
      >
        ✕
      </button>
    </div>
  );
};

export default ListItem;
