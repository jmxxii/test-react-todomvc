import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "../styles/todoList.css";
import Logo from "../images/plaza.gif";

class TodoList extends Component {
  constructor(props) {
      super(props);

      this.state = {
        items: []
      };
      this.counter = 0
      this.addItem = this.addItem.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
      this.completedCheck = this.completedCheck.bind(this);
      this.editItem = this.editItem.bind(this);
  }
  

  addItem(x) {
    var itemArray = this.state.items;
    if (this._inputElement.value !== "") {
      this.counter += 1;
      itemArray.unshift({
        text: this._inputElement.value,
        key: Date.now(),
        done: false,
        editing: false
      });
      this.setState({
          items: itemArray
      });
      this._inputElement.value = "";
    }
    console.log(itemArray)
    x.preventDefault(); 
  }

  deleteItem(key) {
    this.counter -= 1;
    var eachItem = this.state.items.filter(item => {
      return (item.key !== key);
    })
    this.setState({
      items: eachItem
    });
  }

  completedCheck(e, key) {
    var listItems = this.state.items.map((item) => {
      if(key === item.key){
        return item.done = e.target.checked;
      }
    });
    
  }

  clear(){
    var count = 0;
    var listItems = this.state.items.filter(item => {
      if(item.done === false){
        return item;
      } else {
        count++;
      }
    })
    this.setState({
      items: listItems
    });
    this.counter -= count;
  }

  editItem(e, key, edit){
    console.log(edit.value, "Edit Input Value")
    var itemLoop = this.state.items.filter(item => {
      if (item.key === key){
        return item.text = edit.value;
      } else {
        return item;
      }
    })
    this.setState({
      items: itemLoop
    });
    //  Stumped does not let me loop through
    e.preventDefault(); 
  }
  
  render(){  
    return (
        <div className="toDoListContain">
          <div className="header">
            <img className="logo" src={Logo} />
            <h1 className="white">Genius</h1>
            <h1 className="orange">Plaza</h1>
          </div>
            <div className="control" > 
              <h3>To Do List</h3>
              <h4><strong>{this.counter} items</strong></h4>
                <form onSubmit={this.addItem} className="form">
                  <input ref={(a) => this._inputElement = a} maxLength="50" placeholder="Task(ex. 'Do Dishes')" />
                  <button type="submit" className="add">+</button>
                </form>
                <button className="clear" onClick={()=> this.clear()}>Clear Completed</button>
            </div>
            <div className="itemBox">
              <TodoItems entries={this.state.items} delete={this.deleteItem} 
              complete={this.completedCheck} editItem={this.editItem} />
            </div>
        </div>
    );
  }
}  

export default TodoList;