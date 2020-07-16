import React from 'react';
import s from './App.module.css';
import InputLine from "./components/inputLine/inputLine";
import TodoList from "./components/todoList/todoList";
import Footer from "./components/footer/footer";
import {v4 as uuidv4} from 'uuid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      filter: "#/",
    }
  }

  inLocalStore = () => {
    localStorage.setItem("todoData", JSON.stringify(this.state.todoData));
    localStorage.setItem("filter", JSON.stringify(this.state.filter));
  }

  checkAll = () => {
    let bul = true;
    this.state.todoData.find(item => {
      return (item.check === false)
    }) ? bul = true : bul = false;
    const todoData = this.state.todoData.map(item => {
      item.check = bul;
      return item;
    })
    this.setState({todoData: todoData});
  }

  addTodo = (text) => {
    const todoData = this.state.todoData.slice();
    const newData = {
      id: uuidv4(),
      check: false,
      text: text,
    }
    todoData.push(newData);
    this.setState({todoData: todoData}, this.inLocalStore);
  }

  deleteItem = (id) => {
    const todoData = this.state.todoData.filter(item => item.id !== id)
    this.setState({todoData: todoData}, this.inLocalStore);
  }

  updateCheckBox = (id) => {
    const todoData = this.state.todoData.map(item => {
      if (item.id === id) {
        item.check = !item.check;
      }
      return (item);
    })
    this.setState({todoData: todoData}, this.inLocalStore);
  }
  updateTodo = (id, text) => {
    const todoText = this.state.todoData.map(item => {
      if (item.id === id) {
        item.text = text;
      }
      return (item);
    })
    this.setState({todoData: todoText}, this.inLocalStore);
  }

  itemLeft = () => {
    const todoData = this.state.todoData.filter(item => item.check === false);
    return todoData.length;
  }
  deleteCompleted = () => {
    const todoData = this.state.todoData.filter(item => item.check === false);
    this.setState({todoData: todoData}, this.inLocalStore);
  }
  anyCompleted = () => {
    const todoData = this.state.todoData.filter(item => item.check === true);
    return todoData;
  }
  changeFilter = (filter) => {
    this.setState({filter: filter}, this.inLocalStore)
  }

  filterTodo = () => {
    if (this.state.filter === "#/") {
      return this.state.todoData;
    }
    if (this.state.filter === "#/active") {
      const activeTodo = this.state.todoData.filter(item => item.check === false);
      return activeTodo;
    }
    if (this.state.filter === "#/completed") {
      const completedTodo = this.state.todoData.filter(item => item.check === true);
      return completedTodo;
    }
  }

  componentDidMount() {
    const localFilter = window.location.hash
    this.setState({filter: localFilter});
    const localData = JSON.parse(localStorage.getItem('todoData'));
    if (localData) {
      this.setState({todoData: localData});
    }

  }

  render() {
    return (
        <div className={s.App}>
          <h1 className={s.logo}>todos</h1>
          <InputLine
              todolist={this.state.todoData}
              className={s.inputLine}
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
