import React from 'react';
import ReactDom from 'react-dom';
import './styles/index.css';
import ToDoList from './component/todolist';

ReactDom.render(<ToDoList/>, document.getElementById('root'));