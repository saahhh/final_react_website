//Todo.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreatePage from "./CreatePage";
import ListPage from "./ListPage";

function Todo() {
  const Home = () => <div>Home</div>;

  //js로 state 상태관리
  const [actions, setActions] = useState([]);

  //생성하기
  const addAction = (newAction) => {
    setActions([...actions, newAction]);
  };
  //삭제하기
  const deleteAction = (id) => {
    setActions(actions.filter((action) => action.id !== id));
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<ListPage actions={actions} deleteAction={deleteAction} />}
          >
            메인
          </Route>
          <Route path="/create" element={<CreatePage action={addAction} />}>
            생성
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Todo;
