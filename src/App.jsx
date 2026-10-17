import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import BrowseByLanguage from "./pages/BrowseByLanguage/BrowseByLanguage";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Movies from "./pages/Movies/Movies";
import MyList from "./pages/MyList/MyList";
import NewsAndPopular from "./pages/NewsAndPopular/NewsAndPopular";
import NotFound from "./pages/NotFound/NotFound";
import TvShows from "./pages/TvShows/TvShows";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Navigate to="/login" replace />} />
      <Route path="/" element={<Layout />}>
        {/* redirect root to /home so the Home nav link's active state stays in sync */}
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="tv" element={<TvShows />} />
        <Route path="movies" element={<Movies />} />
        <Route path="news" element={<NewsAndPopular />} />
        <Route path="mylist" element={<MyList />} />
        <Route path="browse" element={<BrowseByLanguage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
