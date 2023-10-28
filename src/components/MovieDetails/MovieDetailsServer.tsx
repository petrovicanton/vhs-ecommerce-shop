import { getMovie } from "@/libs/apis";

const MovieDetailsServer: any = async (props: { slug: string }) => {
  const { slug } = props;

  const movieDetails = await getMovie(slug);

  return (
    <>
      <h2 className={classNames.name}>{movieDetails.name}</h2>
      <p className={classNames.price}>{movieDetails.price} $</p>
      <h2 className={classNames.description}>{movieDetails.description}</h2>
    </>
  );
};

export default MovieDetailsServer;

const classNames = {
  description: "text-lg text-gray-300 mb-2",
  name: "text-4xl pt-5 text-gray-300 font-bold mb-2",
  price: "text-2xl text-primary font-bold",
};
