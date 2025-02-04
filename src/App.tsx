import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import TopRatedMovies from "./pages/TopRated";
import PopularMovies from "./pages/Popular";
import MovieDetails from "./pages/MovieDetails";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/toprated" element={<TopRatedMovies />} />
        <Route path="/popular" element={<PopularMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/movie/:id/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}
