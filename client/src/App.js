//AppMain.js
//App.js 둘 다 내용 동일함

// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cafes, setCafes] = useState([]);
  const [newCafe, setNewCafe] = useState({ name: " ", price: " " });

  useEffect(() => {
    const timestamp = new Date().getTime();
    axios
      .get(`http://localhost:5003/api/cafe?timestamp=${timestamp}`)
      .then((response) => {
        console.log("Cafes Data:", response.data);
        setCafes(response.data);
      })
      .catch((error) => console.error("에러입니다.", error));
  }, []);

  const addCafe = () => {
    axios
      .post("http://localhost:5003/api/cafe", newCafe)
      .then(() => {
        const timestamp = new Date().getTime();
        axios
          .get(`http://localhost:5003/api/cafe?timestamp=${timestamp}`)
          .then((response) => {
            console.log("Cafes Data after addition:", response.data);
            setCafes(response.data);
            setNewCafe({ name: " ", price: " " });
          })
          .catch((error) => console.error("에러입니다.", error));
      })
      .catch((error) => console.error("에러입니다.", error));
  };

  return (
    <div>
      <h1>카페 리스트</h1>

      <ul>
        {cafes.map((cafe) => (
          <li key={cafe.ID}>
            {cafe.NAME} - {cafe.PRICE}원
          </li>
        ))}
      </ul>

      <h2>새로운 메뉴 추가</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newCafe.name}
          onChange={(e) => setNewCafe({ ...newCafe, name: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={newCafe.price}
          onChange={(e) => setNewCafe({ ...newCafe, price: e.target.value })}
        />
      </div>
      <button onClick={addCafe}>추가하기</button>
    </div>
  );
}

export default App;

/*
key={cafe[0] = key={cafe.ID}
        cafe[1] = cafe.NAME
        cafe[2] = cafe.PRICE
*/

/*
import axios from "axios";
import React, { useEffect, useState } from "react";

function AppCafe() {
  const [cafes, setCafes] = useState([]);
  const [newCafe, setNewCafe] = useState({ name: "", price: "" });

  const addCafe = () => {
    axios
      .post("http://localhost:5003/api/cafe", newCafe)
      .then((response) => {
        setCafes(response.data);
        setNewCafe({ name: "", price: "" }); //데이터베이스에 저장 후 초기화 해주는 것
      })
      .catch((error) => console.error("에러가 발생했습니다", error));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/cafe")
      .then((response) => setCafes(response.data))
      .catch((error) => console.error("에러입니다", error));
  });

  return (
    <div>
      <h1>카페 메뉴</h1>
      <ul>
        {cafes.map((cafe) => (
          <li key={cafe.ID}>
            {cafe.NAME} - {cafe.PRICE} 원
          </li>
        ))}
      </ul>

      <h2>새로운 메뉴 추가</h2>
      <div>
        <label>메뉴 이름 : </label>
        <input
          type="text"
          value={newCafe.name}
          onChange={(e) => setNewCafe({ ...newCafe, name: e.target.value })}
        />
        <label>가격 : </label>
        <input
          type="text"
          value={newCafe.price}
          onChange={(e) => setNewCafe({ ...newCafe, price: e.target.value })}
        />
        <button onClick={addCafe}>메뉴 추가하기</button>
      </div>
    </div>
  );
}

export default AppCafe;
*/
