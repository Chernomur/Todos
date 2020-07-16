import React from "react";

import style from "./footer.module.css"

const FooterItem = ({ title, value, onClick }) => {
  return (
    <li>
      <a
        href={value}
        onClick={() => onClick(value)}
      >
        {title}
      </a>
    </li>
  );
};

const Footer = (props) => {
  const itemsLeft = props.itemLeft();

  const completed = props.anyCompleted();

  return (
    <div className={style.footer}>
      <span className={style.itemsLeft}>
        {itemsLeft} items left
      </span>

      <ul className={style.filter}>
        <FooterItem value="#all" title="All" onClick={props.changeFilter} />

        <li>
          <a
            href={"#allactive"}
            onClick={() => props.changeFilter("#allactive")}
          >
            Active
          </a>
        </li>

        <li>
          <a
            href="#allcompleted"
            onClick={() => props.changeFilter("#allcompleted")}
          >
            Completed
          </a>
        </li>
      </ul>

      {completed.length > 0 && (
        <button
          className={style.clearComplete}
          onClick={props.deleteCompleted}
        >
          clear completed [{completed.length}]
        </button>
      )}
    </div>
  );
};

export default Footer;
