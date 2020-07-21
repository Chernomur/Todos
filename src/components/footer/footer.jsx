import React from "react";

import PropTypes from "prop-types";
import FooterItem from "./footerItem/footerItem.jsx";

import style from "./footer.module.css";

const Footer = (props) => {
  return (
    <div className={style.footer}>
      <span className={style.itemsLeft}>
      {props.activeCounter === 1 ? `${props.activeCounter} item left` : `${props.activeCounter} items left`}
      </span>

      <ul className={style.filter}>
        <FooterItem
          value="#all"
          title="All"
          onClick={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allactive"
          title="Active"
          onClick={props.changeFilter}
          filter={props.filter}
        />
        <FooterItem
          value="#allcompleted"
          title="Completed"
          onClick={props.changeFilter}
          filter={props.filter}
        />
      </ul>

      {props.completedCounter > 0 && (
        <button
          className={style.clearComplete}
          onClick={props.deleteCompleted}
        >
          clear completed [{props.completedCounter}]
        </button>
      )}
    </div>
  );
};

Footer.propTypes = {
  activeCounter: PropTypes.number,
  deleteCompleted: PropTypes.func,
  completedCounter: PropTypes.number,
  changeFilter: PropTypes.func,
  filter: PropTypes.string
};

Footer.defaultProps = {
  activeCounter: 0,
  deleteCompleted: () => null,
  completedCounter: 0,
  changeFilter: () => null,
  filter: "#all"
};

export default Footer;
