import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Movie from "./Movie/Movie";
import TodoList from "./TodoList/TodoList";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import NumberGuessingGame from "./Game/NumberGuessingGame";
import WeatherSearch from "./Weather/WeatherSearch";
import Weather from "./Weather/Weather";
import MusicPlayerOld from "./Component/Music/MusicPlayerOld";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/todos" element={<TodoList />} />
            <Route
              path="/numberGuessingGame"
              element={<NumberGuessingGame />}
            />
            <Route path="/weathersearch" element={<WeatherSearch />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/music" element={<MusicPlayerOld />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
