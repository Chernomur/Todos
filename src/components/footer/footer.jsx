import React from "react";
import s from "./footer.module.css"

const Footer = (props) => {
  const itemsLeft = props.itemLeft();

  const drawAllComplete = () => {
    const completed = props.anyCompleted();
    if (completed.length > 0) {
      return <button className={s.clearComplete} onClick={props.deleteCompleted}>
        clear completed [{completed.length}]
      </button>
    }
  }

  return (
      <div className={s.footer}>
        <span className={s.itemsLeft}>{itemsLeft} items left</span>
        <ul className={s.filter}>
          <li><a href={"/#/"} onClick={() => props.changeFilter("#/")}>All</a></li>
          <li><a href={"/#/active"} onClick={() => props.changeFilter("#/active")}>Active</a></li>
          <li><a href={"/#/completed"} onClick={() => props.changeFilter("#/completed")}>Completed</a></li>
        </ul>
        {drawAllComplete()}
      </div>
  )
}
export default Footer;