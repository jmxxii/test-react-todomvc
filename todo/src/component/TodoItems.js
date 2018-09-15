import React, { Component } from "react";

class TodoItems extends Component {
  constructor(props) {
    super(props);
    this.createTasks = this.createTasks.bind(this);
    this.state = { editing: false}
  }
  createTasks(item) {
    var viewStyle = {};
    var editStyle = {};

    this.state.editing ? viewStyle.display = 'none' : editStyle.display = 'none';

    return <li key={item.key}>
                  <form onSubmit={(e) => this.finishEdit(e,item.key)} style={ editStyle }>
                      <input ref={(a) => this.editInput = a} placeholder={item.text}/>
                  </form>
                  <p onDoubleClick={()=> this.edit()} style={viewStyle}>{item.text}</p>
                    <div className="complete">
                      <input style={viewStyle} className="checkbox" type="checkbox" onChange={(e) => this.toggleComplete(e, item.key)}/>
                      <label style={viewStyle}>Complete?</label>
                      <button style={viewStyle} onClick={() => this.delete(item.key)}>x</button>
                    </div>
          </li>
  }

toggleComplete(e, key) {
  this.props.complete(e, key);
}

finishEdit(e, key){
  this.setState({ editing: false })
  this.props.editItem(e, key, this.editInput);
}

delete(key) {
  this.props.delete(key);
}
 
edit(key) {
  this.setState({ editing: true }) 
}

  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
  
    return (
      <ul className="item"> 
          {listItems} 
      </ul>
    );
  }
}

export default TodoItems;