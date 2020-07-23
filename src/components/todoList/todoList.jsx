import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";
import ListItem from "./listItem/listItem.jsx";

import {TaskType} from "../../utils/types";

const TodoListSC = styled.div`

  display: flex;
  background-color: #fefefe;
  width: 550px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style-type: none;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  display: flex;
  background-color: #fefefe;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin:0;
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  li {
    list-style-type: none;
  }
}
`;

const TodoList = (props) => {
  return (
    <TodoListSC>
      <ul>
        {props.tasks.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            showInput={item.showInput}
            check={item.check}
            text={item.text}
            updateCheckbox={props.updateCheckbox}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          />
        ))}
      </ul>
    </TodoListSC>
  );
};

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
