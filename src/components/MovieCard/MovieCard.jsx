const MovieCard = ({ movie }) => {
  const {
    title,
    vote_average,
    poster_path,
    // backdrop_path,
    // popularity,
    release_date,
    // vote_count,
    original_language,
  } = movie;

  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "src/assets/no-movie.png"
        }
        alt={title}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <span className="text-5xl">
              <i className="fa fa-star text-yellow-500"></i>
            </span>

            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
