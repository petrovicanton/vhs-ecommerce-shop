import HeroSection from "@/components/HeroSection/HeroSection";
import MovieCard from "@/components/MovieCard/MovieCard";
import Link from "next/link";
import { getMovies, getRecentMovies } from "@/libs/apis";

export default async function Home() {
  const movies = await getMovies();
  const isTrendingMovies = movies?.filter((movie) => movie.isTrending);
  const recentMovies = await getRecentMovies();

  return (
    <>
      <HeroSection showLink />
      <section className="px-6 sm:px-12 md:px-20 lg:px-36 mx-auto py-8 text-white">
        <div className="flex flex-col mb-8">
          <h2 className="font-bold text-3xl text-center custom-dropShadow">
            Currently Trending Movies
          </h2>
        </div>
        <div className="flex gap-8 flex-wrap">
          {isTrendingMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieName={movie.name}
              imageUrl={movie.images[0].url}
              slug={movie.slug.current}
              price={movie.price}
            />
          ))}
        </div>
      </section>

      {/* Recent Movies Section */}
      <section
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1651204978999-00d7ce1b078a?auto=format&fit=crop&q=80&w=2054&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          opacity: "80%",
          height: "100vh",
          overflow: "auto",
        }}
        id="recent-movies"
        className="py-16 px-4 text-white text-center bg-fixed lg:py-36 lg:px-36"
      >
        <h2 className="text-3xl lg:text-4xl font-bold mb-3 mt-[-40px] custom-dropShadow">
          Our Recent Movies
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto lg:text-lg custom-dropShadow">
          Stay Ahed of the Movie Curve with our Latest Movies.
        </p>

        <div className="flex rounded gap-8 flex-wrap py-10">
          {recentMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieName={movie.name}
              imageUrl={movie.images[0].url}
              price={movie.price}
              slug={movie.slug.current}
            />
          ))}
        </div>

        <Link
          href="movies/#movies"
          className="mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary-gradient border-2 border-primary-dark"
        >
          See All
        </Link>
      </section>
    </>
  );
}
