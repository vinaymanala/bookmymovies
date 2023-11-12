import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import TopRatedMovies from "./pages/TopRated";
import PopularMovies from "./pages/Popular";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/toprated" element={<TopRatedMovies />} />
        <Route path="/popular" element={<PopularMovies />} />
      </Routes>
    </BrowserRouter>
  );
}
