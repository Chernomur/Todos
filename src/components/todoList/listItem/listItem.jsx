import s from "./ListItem.module.css";
import React from "react";


const ListItem = (props) => {

  const inputText = React.createRef();
  const updateText = () => {
    const text = inputText.current.value;
    props.updateTodo(props.id, text)
  }

  return (<div className={s.listItem}>
        <input onChange={() => props.updateCheckBox(props.id)} type="checkbox"
               className={s.check}
               checked={props.check}/>
        <input onChange={updateText}
               className={s.todo}
               value={props.text}
               ref={inputText}/>
        <button className={s.deleteTodo} onClick={()=> props.deleteItem(props.id)}>✕</button>
      </div>
  )
}

export default ListItem
