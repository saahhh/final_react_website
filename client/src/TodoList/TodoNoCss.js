import React, { useState, useEffect } from "react";

function TodoNoCss() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [count, setCount] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTodo, setEditTodo] = useState("");

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodos("");
    setCount((count) => count + 1);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setCount((count) => count - 1);
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditTodo(todo);
  };

  const saveEdit = () => {
    const updatedTodos = [...todos];
    updateTodos[editingIndex] = editTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
  };

  const cancleEdit = () => {
    setEditingIndex(null);
    setEditTodo("");
  };

  useEffect(() => {
    document.title = `할일 갯수 : ${count}`;
  }, [count]);

  return (
    <div>
      <h2></h2>
    </div>
  );
}
