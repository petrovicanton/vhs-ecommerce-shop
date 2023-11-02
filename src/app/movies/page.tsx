"use client";

import { useState, useEffect, ChangeEvent } from "react";
import MovieCard from "@/components/MovieCard/MovieCard";
import { getMovies, getCategories } from "@/libs/apis";
import { Category } from "@/models/category";

interface Movie {
  _id: string;
  name: string;
  images: { url: string }[];
  slug: { current: string };
  price: number;
  category: { name: string; slug: { current: string } };
}

const Movies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      console.log("Selected category:", event.target.value);
      setSelectedCategory(event.target.value);
    } else {
      console.log("Unselected category");
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieData = await getMovies();
        setMovies(movieData);

        const categoryData = await getCategories();
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const sortedMovies = [...movies].sort((a, b) => a.name.localeCompare(b.name));

  const filteredMovies = sortedMovies
    .filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((movie) =>
      selectedCategory ? movie.category.slug.current === selectedCategory : true
    );

  return (
    <div>
      <section className={classNames.section} id="movies">
        <h2 className={classNames.heading}>Movies</h2>
        <p className={classNames.subHeading}>
          Checkout our latest collection of VHS-tapes
        </p>

        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 m-2 rounded border border-gray-300 text-black w-4/5 md:w-[25%]"
        />

        <div className="py-4">
          <h3>Filter by Category:</h3>
          {categories.map((category) => (
            <label
              className="ml-5 text-sm font-medium text-gray-900 dark:text-gray-300"
              key={category._id}
            >
              <input
                type="checkbox"
                value={category.slug.current}
                checked={selectedCategory === category.slug.current}
                onChange={handleCategoryChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              {category.name}
            </label>
          ))}
        </div>

        <div className="flex rounded gap-8 flex-wrap py-10">
          {filteredMovies.map((movie) => (
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
    </div>
  );
};

export default Movies;

const classNames = {
  section: "py-16 lg:pb-36 px-4 lg:px-36 text-white text-center",
  heading: "text-3xl lg:text-4xl font-bold mb-3",
  subHeading: "text-gray-400 max-w-xl mx-auto lg:text-lg",
};
