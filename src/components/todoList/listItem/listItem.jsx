import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const DeleteTodo = styled.button`
  visibility: hidden;
  `;
const ListItemSC = styled.li`
  padding: 0px 15px 0px 15px;
  display: flex;
  background-color: #fefefe;
  width: 520px; 
  align-items: center;
  justify-items: end;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  
  :hover ${DeleteTodo} {

  visibility: visible;
  font-size: large;
  font-weight: bolder;
  border: 0;
  background: transparent;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    display: flex;
    background-color: #fefefe;
    
    width: 100%;
    height: 63px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    
    ${DeleteTodo} {
    justify-self: flex-end;
  }
}
`;

const CheckSC = styled.input`
  background-color: #fefefe;
  color: #e6e6e6;
  border: solid 1px maroon;
  border-radius: 100px;
  width: 8%;
  height: 60px;
  `;

const TaskContainerSC = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
 `;
const TodoInputSC = styled.input`
  padding: 10px 0 10px;
  margin: 8px 0 8px 40px;
  display: flex;
  justify-self: start;
  user-select: none;
  border: 1px solid blue;
  resize: none;
  width: 100%;
  min-height: 90%;
  font-size: 24px;
 `;
const TodoCheckSC = styled.li`
  display: flex;
  justify-self: start;
  align-self: center;
  text-decoration: line-through;
  border: none;
  resize: none;
  color: #e6e6e6;
  width: 100%;
  min-height: 90%;
  font-size: 24px;
`;

const TodoSC = styled.li`
  display: flex;
  justify-self: start;
  align-self: center;
  user-select: none;
  border: none;
  resize: none;
  width: 100%;
  height: 90%;
  font-size: 24px;
  word-break: break-all;
 `;

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldText: this.props.text,
      showInput: false
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  saveText = (id) => {
    this.props.updateTask(id, this.state.oldText);
  }

  toShowInput = (showInput) => {
    // const copy = { ...this.state };
    // copy.showInput = show;
    this.setState({ showInput });
  }

  updateText = (event) => {
    const text = event.target.value;
    this.setState({ oldText: text });
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

  handleClickOutside = (event) => {
    const clickedElem = document.getElementById(this.props.id);

    if (!event.path.includes(clickedElem) && event.target.tagName === "LI") {
      this.toShowInput(false);
      this.setState({ oldText: this.props.text });
    }
  }

  render() {
    return (
      <ListItemSC
        id={this.props.id}
        onDoubleClick={(event) => {
          if (event.target.tagName !== "INPUT") {
            this.toShowInput(true);
          }
        }}
      >
        {this.state.showInput ? (
          <TodoInputSC
            autoFocus
            onKeyDown={this.inputConfirmation}
            onChange={this.updateText}
            value={this.state.oldText}
          />
        )
          : (
            <TaskContainerSC>
              <CheckSC
                onChange={() => this.props.updateCheckbox(this.props.id)}
                type="checkbox"
                checked={this.props.check}
              />

              {this.props.check ?
                <TodoCheckSC>{this.props.text}</TodoCheckSC>
                : <TodoSC>{this.props.text}</TodoSC>
              }

              <DeleteTodo
                onClick={() => this.props.deleteTask(this.props.id)}
              >
                ✕
              </DeleteTodo>
            </TaskContainerSC>
          )
        }
      </ListItemSC>
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  check: PropTypes.bool,
  updateTask: PropTypes.func,
  updateCheckbox: PropTypes.func,
  deleteTask: PropTypes.func
};

ListItem.defaultProps = {
  text: "",
  check: false,
  updateTask: () => null,
  updateCheckbox: () => null,
  deleteTask: () => null
};

export default ListItem;
