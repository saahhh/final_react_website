import React, { useState, useEffect } from "react";

const NumberGuessingGame = () => {
  const randomNumber = () => {
    return Math.floor(Math.random() * 50) + 1;
    // +1을 붙여주지 않으면
    // (Math.random() * 50) 0 ~ 49가 됨
  };
  // targetNumber 에 랜덤으로 생성된 숫자값이 들어갈 수 있도록 설정
  const [targetNumber, setTargetNumber] = useState(randomNumber());
  const [useGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");

  //횟수제한
  const [attempts, setAttempts] = useState(0);
  //내가 입력한 숫자 기록
  const [guessHistory, setGuessHistory] = useState([]);

  useEffect(() => {
    const delay = (ms) => {
      return new Promise((resolve) => setTimeout(resolve));
    };
  });
  // 숫자값이 들어올 때마다 값 변경
  const inputChange = (event) => {
    setUserGuess(event.target.value);
  };
  //useEffect를 활용해서 게임 횟수 제한
  useEffect(() => {
    //만약에 횟수가 끝났다면
    if (attempts === 0) {
      setMessage(`게임오버! 정답은 ${targetNumber}입니다. 껄껄`);
      //게임이 종료되었으니 숫자 랜덤으로 다시 생성하고
      setTargetNumber(randomNumber());
      //횟수는 다시 5회로 만들어주고
      setAttempts(5);
      //사용자가 작성한 기록은 모두 지워줌
      setGuessHistory([]);
    }
  }, [attempts, targetNumber]);

  // 숫자값 전달
  const inputSubmit = (event) => {
    // 페이지가 다시 로딩되는것을 방지
    // 페이지가 자동으로 새로고침 되는 것을 막아주는 역할
    event.preventDefault();
    // 사용자가 입력한 값을 숫자로 변환해주는 역할
    // 10진수 : 우리가 흔히 사용하는 0~9 숫자를 의미
    const guess = parseInt(useGuess, 10);

    // NaN = Not a Number
    // 주어진 값이 숫자가 맞는지 숫자가 아닌지
    // 판별하는 역할
    if (isNaN(guess)) {
      setMessage("숫자가 입력이 가능합니다.");
    } else {
      //사용자가 작성한 숫자값을 기록하는 함수 생성
      const newGuessHistory = [...guessHistory, guess];
      setGuessHistory(newGuessHistory);

      if (guess === targetNumber) {
        setMessage(`정답입니다. 숫자는 : ${targetNumber}`);
        setTargetNumber(randomNumber());
        //숫자를 맞췄기 때문에 초기화 작업 진행
        setAttempts(5);
        setGuessHistory([]);
      } else {
        //숫자가 틀렸을 때 횟수를 차감하는 함수를 작성
        const remaingAttempts = attempts - 1;
        setAttempts(remaingAttempts);

        if (remaingAttempts === 0) {
          setMessage(`게임오버! 정답은 ${targetNumber} 입니다.`);
          setTargetNumber(randomNumber());
          setAttempts(5);
          setGuessHistory([]);
        } else {
          setMessage(
            guess < targetNumber
              ? "숫자가 너무 낮습니다."
              : "숫자가 정답보다 높습니다."
          );
        }
      }
      setUserGuess("");
    }
  };
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h1>숫자 맞추기 게임</h1>
            <p className="card-text">1부터 100 사이 숫자 맞추기</p>
            <form onSubmit={inputSubmit}>
              <input
                type="number"
                value={useGuess}
                onChange={inputChange}
                placeholder="숫자를 입력하세요."
                min="1"
                max="100"
                required
              />
              <button className="btn btn-outline-primary mb-2" type="submit">
                제출하기
              </button>
            </form>
            <div>
              <p>남은기회 : {attempts}</p>
              <p>입력한 숫자 : {guessHistory.join(",")}</p>
            </div>
            {message && <div> {message} </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberGuessingGame;
