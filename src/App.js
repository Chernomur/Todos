import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import InputLine from "components/inputLine/InputLine";
import TodoList from "components/todoList/TodoList";
import Footer from "components/footer/Footer";

import theme from "ui/styles/theme";
import { TaskType } from "utils/types";
import {
  addTask,
  changeAllCheckbox,
  deleteCompletedTasks,
  deleteTask,
  updateCheckbox,
  updateTask
} from "store/todo/actions";
import { changeFilter } from "store/filter/actions";

const App = (props) => {
  let activeCounter = 0;
  let completedCounter = 0;
  const tasks = props.todoData.filter(({ check }) => {
    // eslint-disable-next-line no-unused-expressions
    check ? completedCounter++ : activeCounter++;

    if (props.filter === "#all") {
      return true;
    }

    return (
      (check && props.filter === "#allcompleted") ||
      (!check && props.filter === "#allactive")
    );
  });

  return (
    <StyledPage>
      <h1 className="page-logo">todos</h1>

      <InputLine
        activeCounter={activeCounter}
        todoData={props.todoData}
        addTask={props.addTask}
        changeAllCheckbox={props.changeAllCheckbox}
      />

      <TodoList
        updateCheckbox={props.updateCheckbox}
        updateTask={props.updateTask}
        deleteTask={props.deleteTask}
        tasks={tasks}
      />

      <Footer
        filter={props.filter}
        activeCounter={activeCounter}
        deleteCompletedTasks={props.deleteCompletedTasks}
        completedCounter={completedCounter}
        changeFilter={props.changeFilter}
      />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (${theme.windowSize.mobile}) {
    align-items: start;
  }

  input:focus {
    outline: none;
  }

  .page-logo {
    margin: 30px;
    font-size: 100px;
    font-style: normal;
    font-weight: 100;
    color: ${theme.colors.logoColor};
  }
`;

App.propTypes = {
  filter: PropTypes.string.isRequired,
  addTask: PropTypes.func.isRequired,
  updateCheckbox: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changeAllCheckbox: PropTypes.func.isRequired,
  deleteCompletedTasks: PropTypes.func.isRequired,
  todoData: PropTypes.arrayOf(TaskType).isRequired
};

const connectFunction = connect(
  (state) => ({
    todoData: state.todoReducer.todoData,
    filter: state.filterReducer.filter
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
