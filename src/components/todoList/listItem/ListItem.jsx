import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";
import theme from "ui/styles/theme";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldText: this.props.text
    };
  }

  saveText = (id) => {
    this.props.updateTask({ id, text: this.state.oldText });
  }

  changeTaskStatus = () => {
    this.props.updateCheckbox(this.props.id);
  }

  deleteTaskClick = () => {
    this.props.deleteTask(this.props.id);
  }

  checkInputStatus = (event) => {
    if (event.target.tagName !== "INPUT") {
      this.props.changeInputStatus(this.props.id);
    }
  }

  updateText = (event) => {
    const text = event.target.value;
    this.setState({ oldText: text });
  }

  inputConfirmation = (e) => {
    if (e.key === "Enter") {
      this.saveText(this.props.id);
      this.props.changeInputStatus(null);
    }
    if (e.key === "Escape") {
      this.props.changeInputStatus(null);
      this.setState({ oldText: this.props.text });
    }
  }

  render() {
    return (
      <ListItemSC
        id={this.props.id}
        onDoubleClick={this.checkInputStatus}
        onTouchEnd={this.checkInputStatus}
        onClick={() => {
          if (this.props.inputStatus !== this.props.id) {
            this.props.changeInputStatus(null);
          }
        }}
      >
        {(this.props.inputStatus === this.props.id) ? (
            <TodoInputSC
              autoFocus
              onKeyDown={this.inputConfirmation}
              onChange={this.updateText}
              value={this.state.oldText}
            />)
          : null}
        {(this.props.inputStatus !== this.props.id) ? (
            <TaskContainerSC>
              <CheckSC
                onChange={this.changeTaskStatus}
                type="checkbox"
                checked={this.props.check}
              />

              {this.props.check ?
                <TodoCheckSC>{this.props.text}</TodoCheckSC>
                : <TodoSC>{this.props.text}</TodoSC>
              }

              <DeleteTodo
                onClick={this.deleteTaskClick}
              >
                ✕
              </DeleteTodo>
            </TaskContainerSC>)
          : null}
      </ListItemSC>
    );
  }
}

const DeleteTodo = styled.button`
  visibility: hidden;
`;

const ListItemSC = styled.li`
  padding: 0 15px 0 15px;
  display: flex;
  background-color: ${theme.colors.taskColor};
  width: 520px; 
  align-items: center;
  justify-items: end;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  :hover ${DeleteTodo} {
    visibility: visible;
    font-size: large;
    font-weight: bolder;
    border: 0;
    background: transparent;
  }

@media (${theme.windowSize.mobile}) {
  width: 100%;
    
  ${DeleteTodo} {
    justify-self: flex-end;
  }
}`;

const CheckSC = styled.input`
  border-radius: 100px;
  width: 8%;
  height: 60px;
`;

const TaskContainerSC = styled.div`
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
  width: 100%;
  min-height: 90%;
  font-size: 24px;
`;

const TodoCheckSC = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  text-decoration: line-through;
  border: none;
  resize: none;
  color: ${theme.colors.placeholderColor};
  width: 100%;
  min-height: 90%;
  font-size: 24px;
  word-break: break-all;
  
`;

const TodoSC = styled.div`
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

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  check: PropTypes.bool,
  inputStatus: PropTypes.string,
  updateTask: PropTypes.func,
  updateCheckbox: PropTypes.func,
  deleteTask: PropTypes.func,
  changeInputStatus: PropTypes.func
};

ListItem.defaultProps = {
  text: "",
  inputStatus: "null",
  check: false,
  updateTask: () => null,
  updateCheckbox: () => null,
  deleteTask: () => null,
  changeInputStatus: () => null
};

export default ListItem;
