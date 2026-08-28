import { useEffect, useState } from "react";
import styles from "./DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import { movieInstance } from "../../Utility/MovieInstance.js";
import requests from "../../Utility/requestUrls.js";

function DisplayRow({
  showPopularOnly = false,
  showActionOnly = false,
  showTrendingOnly = false,
  showTopRatedOnly = false,
}) {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [
          trendingRes,
          netflixRes,
          topRatedRes,
          actionRes,
          comedyRes,
          horrorRes,
          romanceRes,
          docRes,
        ] = await Promise.all([
          movieInstance.get(requests.fetchTrending),
          movieInstance.get(requests.fetchNetflixOriginals),
          movieInstance.get(requests.fetchTopRatedMovies),
          movieInstance.get(requests.fetchActionMovies),
          movieInstance.get(requests.fetchComedyMovies),
          movieInstance.get(requests.fetchHorrorMovies),
          movieInstance.get(requests.fetchRomanceMovies),
          movieInstance.get(requests.fetchDocumentaries),
        ]);

        setMovies({
          trending: trendingRes.data.results ?? [],
          netflixOriginals: netflixRes.data.results ?? [],
          topRated: topRatedRes.data.results ?? [],
          action: actionRes.data.results ?? [],
          comedy: comedyRes.data.results ?? [],
          horror: horrorRes.data.results ?? [],
          romance: romanceRes.data.results ?? [],
          documentaries: docRes.data.results ?? [],
        });
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.mainWrapper}>
      {showPopularOnly ? (
        <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
      ) : showActionOnly ? (
        <SlideShow title="Action" movies={movies.action} />
      ) : showTrendingOnly ? (
        <SlideShow title="Netflix Trending" movies={movies.trending} />
      ) : showTopRatedOnly ? (
        <SlideShow title="Top Rated" movies={movies.topRated} />
      ) : (
        <>
          <SlideShow title="Netflix Trending" movies={movies.trending} />
          <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
          <SlideShow title="Top Rated" movies={movies.topRated} />
          <SlideShow title="Action" movies={movies.action} />
          <SlideShow title="Comedy" movies={movies.comedy} />
          <SlideShow title="Horror" movies={movies.horror} />
          <SlideShow title="Romance" movies={movies.romance} />
          <SlideShow title="Documentaries" movies={movies.documentaries} />
        </>
      )}
    </div>
  );
}

export default DisplayRow;
