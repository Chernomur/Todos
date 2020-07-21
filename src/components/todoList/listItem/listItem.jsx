import React from "react";

import PropTypes from "prop-types";
import style from "./ListItem.module.css";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldText: this.props.text,
      showInput: false
    };
  }

  saveText = (id) => {
    this.props.updateTodo(id, this.state.oldText);
  }

  toShowInput = (show) => {
    const copy = { ...this.state };
    copy.showInput = show;
    this.setState(copy);
  }

  updateText = (event) => {
    const text = event.target.value;
    const copyState = { ...this.state, oldText: text };
    this.setState({ oldText: copyState.oldText });
  }

  inputConfirmation = (e) => {
    if (e.key === "Enter") {
      this.saveText(this.props.id);
      this.toShowInput(false);
    }
    if (e.key === "Escape") {
      this.toShowInput(false);
      this.setState({ oldText: this.props.text });
    }
  }

  handleClickOutside = (e) => {
    const clickedElem = document.getElementById(this.props.id);
    if (!e.path.includes(clickedElem)) {
      this.toShowInput(false);
      this.setState({ oldText: this.props.text });
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, false);
  }

  render() {
    return (
      <li
        id={this.props.id}
        className={style.listItem}
        onDoubleClick={() => {
          this.toShowInput(true);
        }}
      >
        {this.state.showInput ?
          <input
            autoFocus
            onKeyDown={this.inputConfirmation}
            onChange={this.updateText}
            className={style.todoInput}
            value={this.state.oldText}
          />
          : <div className={style.taskContainer}>
            <input
              onChange={() => this.props.updateCheckBox(this.props.id)}
              type="checkbox"
              className={style.check}
              checked={this.props.check}
            />
            <div
              className={this.props.check ? style.todoCheck : style.todo}>{this.props.text}
            </div>
            <button
              className={style.deleteTodo}
              onClick={() => this.props.deleteItem(this.props.id)}
            >
              ✕
            </button>
          </div>
        }
      </li>
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  check: PropTypes.bool,
  updateTodo: PropTypes.func,
  updateCheckBox: PropTypes.func,
  deleteItem: PropTypes.func
};

ListItem.defaultProps = {
  text: " ",
  check: false,
  updateTodo: () => null,
  updateCheckBox: () => null,
  deleteItem: () => null
};

export default ListItem;
