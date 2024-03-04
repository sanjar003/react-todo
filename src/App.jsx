import React, { useEffect, useState } from "react";
import Foorm from "./components/Foorm";
import { AiFillDelete } from "react-icons/ai";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState(0);
  const [allComplate, setAllComplate] = useState(0);

  useEffect(() => {
    setAllComplate(todos.filter((todo) => todo.done === true).length);
  });

  const putTodo = (value) => {
    if (value) {
      setTodos([...todos, { id: Date.now(), text: value, done: false }]);
      setAllTodos(allTodos + 1);
    } else {
      alert("ee");
    }
  };
  const ToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          done: !todo.done,
        };
      })
    );
  };
  const removerTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setAllTodos(allTodos - 1);
  };

  const clearTodos = () => {
    setTodos([]);
    setAllTodos(0);
  };
  return (
    <div className="container">
      <h2 className="title">TodoList</h2>
      <Foorm putTodo={putTodo} />
      <ul className="todos">
        {todos.map((todo) => {
          return (
            <li
              className={todo.done ? "todo done" : "todo"}
              key={todo.id}
              onClick={() => ToggleTodo(todo.id)}
            >
              {todo.text}
              <AiFillDelete
              className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  removerTodo(todo.id);
                }}
              />
            </li>
          );
        })}
        <div className="info">
          <span>All todos : {allTodos}</span>
          <span>Complete: {allComplate}</span>
        </div>
        <button className="btn" onClick={clearTodos}>Clear All</button>
      </ul>
    </div>
  );
};

export default App;
