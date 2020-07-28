import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateTask, changeInputStatus, deleteTask } from "store/todo/actions";
import theme from "ui/styles/theme";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unsavedText: this.props.text
    };
  }

  saveText = (id) => {
    this.props.updateTask({ id, text: this.state.unsavedText });
  }

  changeTaskStatus = () => {
    this.props.updateTask({ id: this.props.id, text: this.props.text, check: !this.props.check });
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.id);
  }

  checkAndChangeInput = (event) => {
    if (event.target.tagName !== "INPUT" && event.target.tagName !== "BUTTON") {
      this.props.changeInputStatus(this.props.id);
    }
  }

  resetToNullInputStatus = () => {
    if (this.props.inputStatus !== this.props.id) {
      this.props.changeInputStatus(null);
    }
  }

  changeText = (event) => {
    this.setState({ unsavedText: event.target.value });
  }

  inputConfirmation = (e) => {
    if (e.key === "Enter") {
      this.saveText(this.props.id);
      this.props.changeInputStatus(null);
    }
    if (e.key === "Escape") {
      this.props.changeInputStatus(null);
      this.setState({ unsavedText: this.props.text });
    }
  }

  render() {
    return (
      <StyledListItem
        id={this.props.id}
        onDoubleClick={this.checkAndChangeInput}
        onTouchEnd={this.checkAndChangeInput}
        onClick={this.resetToNullInputStatus}
      >
        {this.props.inputStatus === this.props.id && (
          <StyledTodoInput
            autoFocus
            onKeyDown={this.inputConfirmation}
            onChange={this.changeText}
            value={this.state.unsavedText}
          />
        )}

        {this.props.inputStatus !== this.props.id && (
          <StyledTaskContainer>
            <StyledCheck
              onChange={this.changeTaskStatus}
              type="checkbox"
              checked={this.props.check}
            />
            <StiledTodoText checked={this.props.check}>{this.props.text}</StiledTodoText>
            <DeleteTodo onClick={this.deleteTask}>
              ✕
            </DeleteTodo>
          </StyledTaskContainer>
        )}
      </StyledListItem>
    );
  }
}

const DeleteTodo = styled.button`
  opacity: 0;
  transition: 0.1s;
  font-size: large;
  font-weight: bolder;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const StyledListItem = styled.li`
  padding: 0 15px 0 15px;
  display: flex;
  background-color: ${theme.colors.task};
  width: 520px; 
  align-items: center;
  justify-items: end;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  :hover ${DeleteTodo} {
    opacity: 1;
  }

@media (max-width: ${theme.screenSize.laptop}) {
  width: 100%;
    
  ${DeleteTodo} {
    opacity: 1;
    justify-self: flex-end;
  }
}`;

const StyledCheck = styled.input`
  border-radius: 100px;
  width: 40px;
  height: 60px;
  cursor: pointer;
`;

const StyledTaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 90%;
`;

const StyledTodoInput = styled.input`
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

const StiledTodoText = styled.div`
  display: flex;
  justify-self: start;
  align-self: center;
  text-decoration: ${({ checked }) => (checked ? "line-through" : "unset")};
  border: none;
  resize: none;
  color: ${({ checked }) => (checked ? theme.colors.placeholder : "black")};
  width: 100%;
  min-height: 90%;
  font-size: 24px;
  word-break: break-all;
`;

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  check: PropTypes.bool,
  inputStatus: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changeInputStatus: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  text: "",
  check: false
};

const connectFunction = connect((state) => ({
  inputStatus: state.todo.input
}), {
  updateTask,
  deleteTask,
  changeInputStatus
});

export default connectFunction(ListItem);
