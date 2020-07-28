import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

import InputLine from "components/inputLine/InputLine";
import TodoList from "components/todoList/TodoList";
import Footer from "components/footer/Footer";

import theme from "ui/styles/theme";
import constants from "utils/constants";
import { TaskType } from "utils/types";

const App = (props) => {
  let activeCounter = 0;
  let completedCounter = 0;
  const tasks = props.todoData.filter(({ check }) => {
    // eslint-disable-next-line no-unused-expressions
    check ? completedCounter++ : activeCounter++;

    if (props.filter === constants.COMPLETED) {
      return check;
    }

    if (props.filter === constants.ACTIVE) {
      return !check;
    }

    return props.filter;
  });

  return (
    <StyledPage>
      <h1 className="pageLogo">todos</h1>

      <InputLine
        activeCounter={activeCounter}
      />

      <TodoList
        tasks={tasks}
      />

      <Footer
        activeCounter={activeCounter}
        completedCounter={completedCounter}
      />
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: ${theme.screenSize.laptop}) {
    align-items: start;
  }

  input:focus {
    outline: none;
  }

  .pageLogo {
    margin: 30px;
    font-size: 100px;
    font-style: normal;
    font-weight: 100;
    color: ${theme.colors.logo};
  }
`;

App.propTypes = {
  filter: PropTypes.string.isRequired,
  todoData: PropTypes.arrayOf(TaskType).isRequired
};

const connectFunction = connect(
  (state) => ({
    todoData: state.todo.todoData,
    filter: state.filter.filter
  }),
  null
);

export default connectFunction(App);
