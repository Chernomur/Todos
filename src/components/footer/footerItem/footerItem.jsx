import React from "react";

import PropTypes from "prop-types";

import style from "./footerItem.module.css";

const FooterItem = ({ filter, title, value, onClick }) => {
  return (
    <li className={ filter === value ? style.filterButtonOn : style.filterButton}>
      <a
        href={value}
        onClick={() => onClick(value)}
      >
        {title}
      </a>
    </li>
  );
};

FooterItem.propTypes = {
  filter: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  onClick: PropTypes.func
};
FooterItem.defaultProps = {
  title: "",
  value: "",
  filter: "#all",
  onClick: () => null
};

export default FooterItem;
