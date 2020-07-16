import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import InputLine from "components/inputLine/inputLine";
import TodoList from "components/todoList/todoList";
import Footer from "components/footer/footer";

import style from 'App.module.css';
import { storage } from 'utils';

class App extends React.Component {
  state = {
    todoData: storage.tasks.get(),
    filter: window.location.hash || '#all',
  }

  saveTasksToStorage = () => {
    storage.tasks.set(this.state.todoData);
  }

  checkAll = () => {
    const isActive = Boolean(
      this.state.todoData.find((item) => (item.check === false))
    );

    const todoData = this.state.todoData.map((item) => ({
      ...item,
      check: isActive
    }))

    this.setState({ todoData });
  }

  addTodo = (text) => {
    const todoData = [...this.state.todoData];

    todoData.push({
      id: uuidv4(),
      check: false,
      text
    });

    this.setState({ todoData }, this.saveTasksToStorage);
  }

  deleteItem = (id) => {
    const todoData = this.state.todoData.filter(item => item.id !== id);

    this.setState({ todoData: todoData }, this.saveTasksToStorage);
  }

  updateCheckBox = (id) => {
    const todoData = this.state.todoData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          check: !item.check
        };
      }

      return item;
    });

    this.setState({ todoData }, this.saveTasksToStorage);
  }

  updateTodo = (id, text) => {
    const todoData = this.state.todoData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          text
        };
      };
      return item;
    });

    this.setState({ todoData }, this.saveTasksToStorage);
  }

  itemLeft = () => {
    const todoData = this.state.todoData.filter(item => item.check === false);
    return todoData.length;
  }

  anyCompleted = () => {
    const todoData = this.state.todoData.filter(item => item.check === true);
    return todoData;
  }

  deleteCompleted = () => {
    const todoData = this.state.todoData.filter((item) => item.check === false);
    this.setState({ todoData: todoData }, this.saveTasksToStorage);
  }

  changeFilter = (filter) => {
    this.setState({ filter }, this.saveTasksToStorage)
  }

  filterTodo = () => {
    if (this.state.filter === "#all") {
      return this.state.todoData;
    }
    if (this.state.filter === "#allactive") {
      const activeTodo = this.state.todoData.filter((item) => item.check === false);
      return activeTodo;
    }
    if (this.state.filter === "#allcompleted") {
      const completedTodo = this.state.todoData.filter((item) => item.check === true);
      return completedTodo;
    }
  }

  render() {
    // let activeCounter = 0;
    // let compcompletedCounter = 0;
    // const tasks = this.state.todoData.filter(({ check }) => {
    //   check ? compcompletedCounter++ : activeCounter++;

    //   if ('#all') {
    //     return true;
    //   }

    //   return (
    //     (checked && this.state.filter === "#allcompleted") ||
    //     (!checked && this.state.filter === "#allactive")
    //   );
    // });

    return (
      <div className={style.App}>
        <h1 className={style.logo}>todos</h1>

        <InputLine
          todolist={this.state.todoData}
          className={style.inputLine}
          addTodo={this.addTodo}
          checkAll={this.checkAll}
        />

        <TodoList
          todolist={this.state.todoData}
          updateCheckBox={this.updateCheckBox}
          updateTodo={this.updateTodo}
          deleteItem={this.deleteItem}
          filterTodo={this.filterTodo}
        />

        <Footer
          itemLeft={this.itemLeft}
          deleteCompleted={this.deleteCompleted}
          anyCompleted={this.anyCompleted}
          changeFilter={this.changeFilter}
        />
      </div>
    );
  }
}

export default App;
