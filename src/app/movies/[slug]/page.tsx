"use client";

import MovieDetailsClient from "@/components/MovieDetails/MovieDetailsClient";
import MovieDetailsServer from "@/components/MovieDetails/MovieDetailsServer";

const MovieItem = async (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  return (
    <MovieDetailsClient slug={slug}>
      <MovieDetailsServer slug={slug} />
    </MovieDetailsClient>
  );
};

export default MovieItem;
