import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "ui/styles/theme";
import { TaskType } from "utils/types";

import ListItem from "./listItem/ListItem.jsx";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: null
    };
  }

  changeInputStatus = (value) => {
    this.setState({ input: value });
  }

  render() {
    return (
      <TodoListSC>
        <ul>
          {this.props.tasks.map((item) => (
            <ListItem
              key={item.id}
              id={item.id}
              check={item.check}
              text={item.text}
              updateCheckbox={this.props.updateCheckbox}
              updateTask={this.props.updateTask}
              deleteTask={this.props.deleteTask}
              inputStatus={this.state.input}
              changeInputStatus={this.changeInputStatus}
            />
          ))}
        </ul>
      </TodoListSC>
    );
  }
}

const TodoListSC = styled.div`
  display: flex;
  width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style-type: none;
  }

@media (${theme.windowSize.mobile}) {
  width: 100%;
  margin:0;
  ul {
  
    margin: 0;
    padding: 0;
    width: 100%;
  }
  li {
    list-style-type: none;
        @media (${theme.windowSize.mobile}) {
        width: 100%
    }
  }
}`;

TodoList.propTypes = {
  updateCheckbox: PropTypes.func,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
  tasks: PropTypes.arrayOf(TaskType)
};

TodoList.defaultProps = {
  updateCheckbox: () => null,
  updateTask: () => null,
  deleteTask: () => null,
  tasks: []
};

export default TodoList;
