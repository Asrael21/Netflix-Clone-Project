import { movieInstance } from "./MovieInstance";

/**
 * Fetches a YouTube trailer/teaser video key for a given movie or TV show.
 * @param {Object|string} movie - Movie object or search title string
 * @returns {Promise<{ key: string|null, name?: string, type?: string, error?: string }>}
 */
export async function fetchMovieTrailer(movie) {
  if (!movie) {
    return { key: null, error: "No movie provided" };
  }

  let id = typeof movie === "object" ? movie.id : null;
  let mediaType =
    typeof movie === "object"
      ? movie.media_type || (movie.first_air_date || movie.name ? "tv" : "movie")
      : "movie";
  const title =
    typeof movie === "string"
      ? movie
      : movie?.title || movie?.name || movie?.original_title || movie?.original_name || "";

  // If no ID is provided, search TMDB by title first
  if (!id && title) {
    try {
      const searchRes = await movieInstance.get("/search/multi", {
        params: { query: title },
      });
      const firstResult = searchRes.data?.results?.[0];
      if (firstResult) {
        id = firstResult.id;
        mediaType = firstResult.media_type || (firstResult.first_air_date ? "tv" : "movie");
      }
    } catch (err) {
      console.warn("Error searching TMDB for movie ID:", err);
    }
  }

  if (!id) {
    return {
      key: null,
      error: `Could not find title information for "${title}".`,
      fallbackQuery: title,
    };
  }

  // Helper to fetch video list for a specific media type
  const getVideos = async (type, targetId) => {
    try {
      const res = await movieInstance.get(`/${type}/${targetId}/videos`);
      return res.data?.results || [];
    } catch {
      return [];
    }
  };

  // Helper to find the best YouTube video from a list
  const pickBestVideo = (videoList) => {
    if (!Array.isArray(videoList) || videoList.length === 0) return null;

    const ytVideos = videoList.filter(
      (v) => v.site && v.site.toLowerCase() === "youtube" && v.key
    );
    if (ytVideos.length === 0) return null;

    // 1. Official Trailer
    const officialTrailer = ytVideos.find(
      (v) => v.type === "Trailer" && v.official === true
    );
    if (officialTrailer) return officialTrailer;

    // 2. Any Trailer
    const anyTrailer = ytVideos.find((v) => v.type === "Trailer");
    if (anyTrailer) return anyTrailer;

    // 3. Teaser
    const teaser = ytVideos.find((v) => v.type === "Teaser");
    if (teaser) return teaser;

    // 4. Clip
    const clip = ytVideos.find((v) => v.type === "Clip");
    if (clip) return clip;

    // 5. Any video
    return ytVideos[0];
  };

  try {
    // 1. Try primary media type
    let videos = await getVideos(mediaType, id);
    let best = pickBestVideo(videos);

    // 2. If not found, try the other media type (movie <-> tv)
    if (!best) {
      const alternateType = mediaType === "tv" ? "movie" : "tv";
      videos = await getVideos(alternateType, id);
      best = pickBestVideo(videos);
    }

    if (best) {
      return {
        key: best.key,
        name: best.name,
        type: best.type,
        site: best.site,
      };
    }

    return {
      key: null,
      error: "No official video trailer found for this title on TMDB.",
      fallbackQuery: title,
    };
  } catch (err) {
    console.error("Error fetching movie video:", err);
    return {
      key: null,
      error: "Failed to load video. Please try again later.",
      fallbackQuery: title,
    };
  }
}
