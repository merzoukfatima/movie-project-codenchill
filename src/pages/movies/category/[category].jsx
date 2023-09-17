// pages/movies/[category].js
import { fetchData } from "@/Utility/api"
import MovieList from "/src/components/movielist/movielist" // Create a MovieList component for displaying the list of movies

export default function MovieCategory({ category, movies }) {
  return (
    <div>
      <h1>{category} Movies</h1>
      <MovieList movies={movies} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.params
  let moviesList
  if (category != "latest") {
    moviesList = await fetchData(`movie/${category}`)
  } else {
    moviesList = await fetchData(`/trending/movie/day?language=en-US`)
  }
  const movieIds = moviesList.results.map((movie) => movie.id)
  const movies = await Promise.all(
    movieIds.map((id) => fetchData(`movie/${id}`)),
  )
  return {
    props: {
      category,
      movies: movies,
    },
  }
}
