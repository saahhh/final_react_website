import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [count, setCount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
    setCount((count) => count + 1);
  };

  const removeTodo = (index) => {
    const updateTodos = [...todos];
    updateTodos.splice(index, 1);
    setTodos(updateTodos);
    setCount((count) => count - 1);
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditTodo(todo);
  };

  const saveEdit = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = editTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditTodo("");
  };

  useEffect(() => {
    document.title = `할일 갯수 : ${count}`;
  }, [count]);

  return (
    <div>
      <h2>To do List</h2>
      <div>
        <br />
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button onClick={addTodo}>추가하기</Button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                />
                <button onClick={saveEdit}>저장</button>
                <button onClick={cancelEdit}>취소</button>
              </div>
            ) : (
              <div>
                <dialogActions>
                  <Button onClick={() => startEditing(index, todo)}>
                    수정하기
                  </Button>
                  <Button onClick={() => removeTodo(index)}>삭제하기</Button>
                </dialogActions>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
