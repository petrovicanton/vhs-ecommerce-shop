import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import movieCardClassNames from "./movieCardClassNames";

interface MovieCardProps {
  movieName: string;
  imageUrl: string;
  slug: string;
  price: number;
}

const MovieCard: FC<MovieCardProps> = (props) => {
  const { movieName, imageUrl, slug, price } = props;
  return (
    <Link href={`/movies/${slug}`} className={movieCardClassNames.container}>
      <h3 className={movieCardClassNames.price}>{price}$</h3>
      <Image
        className={movieCardClassNames.image}
        src={imageUrl}
        alt={movieName}
        width={200}
        height={200}
      />

      <div className={movieCardClassNames.movieName}>{movieName}</div>
    </Link>
  );
};

export default MovieCard;
