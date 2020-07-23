import React from "react";

import InputLine from "components/inputLine/inputLine";
import TodoList from "components/todoList/todoList";
import Footer from "components/footer/footer";

import style from "App.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  addTask,
  changeAllCheckbox, changeFilter,
  deleteCompletedTasks,
  deleteTask,
  updateCheckbox,
  updateTask
} from "./redux/todo-reducer";
import { TaskType } from "./utils/types";

class App extends React.Component {
  render() {
    let activeCounter = 0;
    let completedCounter = 0;
    const tasks = this.props.todoData.filter(({ check }) => {
      // eslint-disable-next-line no-unused-expressions
      check ? completedCounter++ : activeCounter++;

      if (this.props.filter === "#all") {
        return true;
      }

      return (
        (check && this.props.filter === "#allcompleted") ||
        (!check && this.props.filter === "#allactive")
      );
    });

    return (
      <StyledPage>
        <h1 className="page-logo">todos</h1>

        <InputLine
          activeCounter={activeCounter}
          todoData={this.props.todoData}
          className={style.inputLine}
          addTask={this.props.addTask}
          changeAllCheckbox={this.props.changeAllCheckbox}
        />

        <TodoList
          updateCheckbox={this.props.updateCheckbox}
          updateTask={this.props.updateTask}
          deleteTask={this.props.deleteTask}
          tasks={tasks}
        />

        <Footer
          filter={this.props.filter}
          activeCounter={activeCounter}
          deleteCompletedTasks={this.props.deleteCompletedTasks}
          completedCounter={completedCounter}
          changeFilter={this.props.changeFilter}
        />
      </StyledPage>
    );
  }
}

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  input:focus {
    outline: none;
  }

  .page-logo {
    margin: 30px;
    font-size: 100px;
    font-style: normal;
    font-weight: 100;
    color: #ead7d7;
  }
`;

App.propTypes = {
  filter: PropTypes.string,
  addTask: PropTypes.func,
  updateCheckbox: PropTypes.func,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
  todoData: PropTypes.arrayOf(TaskType),
  changeFilter: PropTypes.func,
  changeAllCheckbox: PropTypes.func,
  deleteCompletedTasks: PropTypes.func
};

App.defaultProps = {
  filter: "#all",
  changeFilter: () => null,
  updateCheckbox: () => null,
  updateTask: () => null,
  deleteTask: () => null,
  changeAllCheckbox: () => null,
  deleteCompletedTasks: () => null,
  addTask: () => null,
  todoData: []
};

const connectFunction = connect(
  (state) => ({
    todoData: state.todoReducer.todoData,
    filter: state.todoReducer.filter
  }),
  {
    addTask,
    changeAllCheckbox,
    updateCheckbox,
    updateTask,
    deleteTask,
    deleteCompletedTasks,
    changeFilter
  }
);

export default connectFunction(App);
