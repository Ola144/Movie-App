import React, { useEffect, useState } from "react";
import Search from "./components/Search/Search";
import Spinner from "./components/Spinner/Spinner";
import MovieCard from "./components/MovieCard/MovieCard";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";

// API - Application Programming Interface
// - a set of rules that allows one software application to talk to another

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchText, setSeacrhText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingMoviesErrorMsg, settrendingMoviesErrorMsg] = useState("");

  // Debounce the search text to prevent making too many API Request by waiting for user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchText(searchText), 500, [searchText]);

  useEffect(() => {
    fetchMovies(debouncedSearchText);
  }, [debouncedSearchText]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      } else {
        //
        const data = await response.json();

        if (data.Response === "False") {
          setErrorMessage(data.Error || "Failed to fetch movies");
          setMovieList([]);
          return;
        } else {
          setMovieList(data.results || []);
        }

        if (query && data.results.length > 0) {
          await updateSearchCount(query, data.results[0]);
        }
        updateSearchCount();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error fetching movies. Please try again later!");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsLoading(true);
    try {
      const movies = await getTrendingMovies();

      if (!movies) {
        setIsLoading(false);
        throw Error("Error fetching trending movies. Please try again later!");
      } else {
        setTrendingMovies(movies);
      }
    } catch (error) {
      console.log(error);
      settrendingMoviesErrorMsg("" + error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="pattern bg-pattern" />

      <div className="wrapper">
        <header>
          <img src="public/assets/hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchText={searchText} setSearchText={setSeacrhText} />
        </header>

        <div>
          {trendingMoviesErrorMsg && (
            <p className="text-red-500 text-center mt-4">
              {trendingMoviesErrorMsg}
            </p>
          )}
        </div>

        {isLoading && <Spinner />}
        {trendingMovies?.length > 0 && (
          <>
            <section className="trending overflow-x-hidden">
              <h2 className="my-5">Trending Movies</h2>

              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}

        <section className="all-movies">
          <h2 className="mt-5">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500 text-center">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
