import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ListItem from "components/todoList/listItem/ListItem";

import theme from "ui/styles/theme";
import { TaskType } from "utils/types";

const TodoList = (props) => {
  return (
    <StyledTodoList>
      <ul>
        {props.tasks.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            check={item.check}
            text={item.text}
          />
        ))}
      </ul>
    </StyledTodoList>
  );
};

const StyledTodoList = styled.div`
  margin: 0 auto;
  max-width: 550px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ul {
    margin: 0;
    padding: 0;
  }
  
  li {
    list-style-type: none;
  }

  @media (max-width: ${theme.screenSize.laptop}px) {
    width: 100%;
  }
`;

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(TaskType)
};

TodoList.defaultProps = {
  tasks: []
};

export default TodoList;
