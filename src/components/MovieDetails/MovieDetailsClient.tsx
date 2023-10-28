"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

import { getMovie } from "@/libs/apis";
import CarouselSlider from "@/components/CarouselSlider/CarouselSlider";
import { Movie } from "@/models/movie";
import { useAppDispatch } from "@/hooks/storeHook";
import { addItemToCart } from "@/redux/features/cartSlice";

const MovieDetailsClient = (props: {
  slug: string;
  children: React.ReactNode;
}) => {
  const { slug, children } = props;

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [movieDetails, setmovieDetails] = useState<Movie>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchmovieDetails = async () => {
      const movie = await getMovie(slug);
      setmovieDetails(movie);
    };

    fetchmovieDetails();
  }, [slug]);

  const handleDecrease = () => {
    if (!movieDetails) return;
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice(Number(((quantity - 1) * movieDetails.price).toFixed(2)));
    }
  };

  const handleIncrease = () => {
    if (!movieDetails) return;
    if (quantity < movieDetails.quantity) {
      setQuantity(quantity + 1);
      setPrice(Number(((quantity + 1) * movieDetails.price).toFixed(2)));
    }
  };

  const handleAddToCart = () => {
    if (!movieDetails) return;
    dispatch(addItemToCart({ ...movieDetails, quantity }));
  };

  return (
    <>
      <div className="min-h-screen relative">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover w-full h-full"
        >
          <source src="../../../video/vhsOrderBG.mp4" type="video/mp4" />
        </video>
        <div className="flex flex-col sm:flex-row pt-36">
          {movieDetails && (
            <div className="w-full sm:w-1/2">
              <div className="sm:mx-auto">
                <CarouselSlider images={movieDetails.images} />
              </div>
            </div>
          )}

          <div className="mt-10 w-full sm:w-1/2 sm:pl-8 z-10">
            {movieDetails && (
              <div className="text-center">
                <div className="text-2xl sm:text-4xl text-gray-300 font-bold mb-2">
                  {movieDetails.name}
                </div>
                <div className="max-w-lg mx-auto">
                  <div className="text-lg sm:text-base text-gray-300 mb-2">
                    {movieDetails.description}
                  </div>
                </div>
                <div className="text-2xl text-VHSred font-bold">
                  ${movieDetails.price}
                </div>
              </div>
            )}
            <div className="flex justify-center items-center space-x-4 mt-4 mb-10">
              <button
                onClick={handleDecrease}
                className={`px-4 py-1 rounded bg-VHSred text-white ${
                  quantity === 0 ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={quantity === 0}
              >
                -
              </button>
              <input
                type="text"
                className="border outline-none border-gray-300 rounded px-2 py-1 text-center w-12"
                value={quantity}
                readOnly
              />
              {movieDetails && (
                <button
                  onClick={handleIncrease}
                  className={`px-4 py-1 rounded bg-blue-500 text-white ${
                    quantity === (movieDetails.quantity || 0)
                      ? "bg-gray-300 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={quantity === (movieDetails.quantity || 0)}
                >
                  +
                </button>
              )}
              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 rounded bg-blue-500 text-white ${
                  quantity === 0 ? "bg-gray-300 cursor-not-allowed" : ""
                }`}
                disabled={quantity === 0}
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetailsClient;
