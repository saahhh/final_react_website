import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Weather() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null); //latitude : 위도
  const [longitude, setLongitude] = useState(null); //longitude : 경도

  const API_KEY = "4edac2eabf494946a189e86050976521";

  //위치 정보 가지고 오는 useEffect
  useEffect(() => {
    // navigator : 길을 찾아주는 길잡이
    // geolocation : 지리적 위치
    // getCurrentPosition : 현재 위치를 가지고 오는 함수
    // 성공적으로 위치를 가지고 오면 콜백 함수를 호출해서 위치 정보를 포함한 내용을 전달해주는 역할을 함
    // 만약에 위치 정보를 가지고 오는데 실패한다면 오류를 해결해줄 콜백 함수 호출
    // coords : 현재 위치의 좌표
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.log("문제가 생겼습니다.", error);
        }
      );
    } else {
      console.error("내 위치 정보를 가져올 수 없습니다.");
    }
  }, []);

  //내 위치에 대한 날씨 가져오는 함수 생성
  const searchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}`
      );
      setWeather(response.data.data[0]);
    } catch (error) {
      console.error("에러발생", error);
    } finally {
      setLoading(false);
    }
  };

  //현재 위치 정보가 변경될 때마다 날씨 가져오기
  useEffect(() => {
    if (latitude && longitude) {
      searchWeather();
    }
    // [latitude, longitude] : 위도, 경도가 바뀔 때 마다 재호출 할 수 있도록 설정
  }, [latitude, longitude]);
  return (
    <div>
      <h1 className="mb-4">날씨</h1>
      {latitude && longitude ? (
        <div>
          {loading && <p>검색중..</p>}
          {weather.city_name && (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{weather.city_name}</h2>
                <p className="card-text">온도 : {weather.temp}</p>
                <p className="card-text">습도 : {weather.rh}%</p>
                <p className="card-text">
                  날씨 : {weather.weather.description}
                </p>
                {weather.weather.icon && (
                  <img
                    className="mb-3 img-fluid rounded mx-auto d-block"
                    src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
                    alt="Weather Icon"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <p>현재 위치를 가져오는 중입니다.</p>
      )}
    </div>
  );
}

export default Weather;

// mx-auto : 가로로 정렬
// d-block : 가운데 정렬
