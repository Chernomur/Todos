import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { updateTask, changeEditableTaskId, deleteTask } from "store/todo/actions";
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
    this.props.updateTask({
      id: this.props.id,
      text: this.props.text,
      check: !this.props.check
    });
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.id);
  }

  latestTap;

  checkAndChangeEditableTaskId = (event) => {
    // eslint-disable-next-line no-param-reassign
    event.target.style.opacity = 1;
    const now = new Date().getTime();
    const timeSince = now - this.latestTap;

    if (
      event.target.tagName !== "INPUT" &&
      event.target.tagName !== "BUTTON"
    ) {
      if ((timeSince < 600) && (timeSince > 0)) {
        this.props.changeEditableTaskId(this.props.id); // double click
      } else if (this.props.editableTaskId !== this.props.id) {
        this.props.changeEditableTaskId(null); // only click
      }
      this.latestTap = new Date().getTime();
    }
  }

  changeText = (event) => {
    this.setState({ unsavedText: event.target.value });
  }

  EditableTaskConfirmation = (e) => {
    if (e.key === "Enter") {
      this.saveText(this.props.id);
      this.props.changeEditableTaskId(null);
    } else if (e.key === "Escape") {
      this.props.changeEditableTaskId(null);
      this.setState({ unsavedText: this.props.text });
    }
  }

  render() {
    return (
      <StyledListItem
        id={this.props.id}
        onClick={this.checkAndChangeEditableTaskId}
      >
        {this.props.editableTaskId === this.props.id && (
          <StyledTodoInput
            autoFocus
            onKeyDown={this.EditableTaskConfirmation}
            onChange={this.changeText}
            value={this.state.unsavedText}
          />
        )}

        {this.props.editableTaskId !== this.props.id && (
          <StyledTaskContainer>

            <StyledCheckbox
              onChange={this.changeTaskStatus}
              type="checkbox"
              checked={this.props.check}
            />

            <StiledTodoTitle checked={this.props.check}>{this.props.text}</StiledTodoTitle>

            <DeleteTaskButton onClick={this.deleteTask}>
              ✕
            </DeleteTaskButton>

          </StyledTaskContainer>
        )}
      </StyledListItem>
    );
  }
}

const DeleteTaskButton = styled.button`
  opacity: 0;
  transition: 0.1s;
  font-size: large;
  font-weight: bolder;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const StyledListItem = styled.li`
  background-color: ${theme.colors.task};
  max-width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
  :hover ${DeleteTaskButton} {
    opacity: 1;
  }
`;

const StyledCheckbox = styled.input`
  border-radius: 100px;
  min-width: 40px;
  max-width: 40px;
  height: 60px;
  cursor: pointer;
`;

const StyledTaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 550px;
  height: 90%;
`;

const StyledTodoInput = styled.input`
  margin-left: 45px;
  padding: 18px 0 18px;
  display: flex;
  user-select: none;
  border: 1px solid blue;
  width: 500px;
  font-size: 24px;
  
  @media (max-width: ${theme.screenSize.laptop}px) {
    width: 100%;
  }
`;

const StiledTodoTitle = styled.div`
  display: flex;
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
  editableTaskId: PropTypes.string.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changeEditableTaskId: PropTypes.func.isRequired
};

ListItem.defaultProps = {
  text: "",
  check: false
};

const connectFunction = connect(
  (state) => ({
    editableTaskId: state.todo.editableTaskId
  }),
  {
    updateTask,
    deleteTask,
    changeEditableTaskId
  }
);

export default connectFunction(ListItem);
