import { useCallback, useState } from "react";
import VideoModal from "../Components/VideoModal/VideoModal";
import { fetchMovieTrailer } from "../Utility/videoHelper";
import { PlayerContext } from "./PlayerContextInstance";

export function PlayerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const playMovie = useCallback(async (selectedMovie) => {
    if (!selectedMovie) return;

    setMovie(selectedMovie);
    setIsOpen(true);
    setLoading(true);
    setVideoKey(null);
    setVideoDetails(null);
    setError(null);

    const result = await fetchMovieTrailer(selectedMovie);

    if (result.key) {
      setVideoKey(result.key);
      setVideoDetails(result);
    } else {
      setError(result.error || "No video trailer available for this title.");
    }

    setLoading(false);
  }, []);

  const closePlayer = useCallback(() => {
    setIsOpen(false);
    setMovie(null);
    setVideoKey(null);
    setVideoDetails(null);
    setError(null);
    setLoading(false);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        isOpen,
        movie,
        videoKey,
        videoDetails,
        loading,
        error,
        playMovie,
        closePlayer,
      }}
    >
      {children}
      <VideoModal />
    </PlayerContext.Provider>
  );
}
