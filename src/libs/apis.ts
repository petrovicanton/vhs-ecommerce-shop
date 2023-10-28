import { Category } from "@/models/category";
import sanityClient from "./sanity";
import { Movie, MovieSubset } from "@/models/movie";
import axios from "axios";

export const getCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] {
        _id,
        name,
        slug {current},
        image, 
        subtitle
    }`;

  const categories: Category[] = await sanityClient.fetch({ query });

  return categories;
};

export const getMovies = async (): Promise<Movie[]> => {
  const query = `*[_type == "movie"] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

  const movies: Movie[] = await sanityClient.fetch({ query });

  return movies;
};

export const getCategoryMovies = async (slug: string): Promise<Movie[]> => {
  const query = `*[_type == "movie" && category->slug.current == "${slug}"] {
    name,
    price,
    images,
    isFeatured,
    isTrending,
    slug,
    quantity,
    description,
    category->{
      name,
      subtitle
    }
  }`;

  const movies: Movie[] = await sanityClient.fetch({ query });

  return movies;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type == "category" && slug.current == "${slug}"][0]`;

  const category: Category = await sanityClient.fetch({ query });

  return category;
};

export const getRecentMovies = async (): Promise<Movie[]> => {
  const query = `*[_type == "movie"] | order(_createdAt desc)[0...4] {
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
      }`;

  const movies: Movie[] = await sanityClient.fetch({ query });

  return movies;
};

export const getMovie = async (slug: string): Promise<Movie> => {
  const query = `*[_type == "movie" && slug.current == "${slug}"][0] {
        _id,
        name,
        price,
        images,
        isFeatured,
        isTrending,
        'category': *[_id == ^.category._ref][0] {
          name,
          slug {
            current
          }
        },
        slug,
        quantity,
        description
  }`;

  const movie: Movie = await sanityClient.fetch({ query });

  return movie;
};

export const updateMovieQuantity = async (movies: MovieSubset[]) => {
  const mutation = {
    mutations: movies.map(({ _id, maxQuantity, quantity }) => {
      return {
        patch: {
          id: _id,
          set: {
            quantity: maxQuantity - quantity,
          },
        },
      };
    }),
  };
  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export const createOrder = async (movies: MovieSubset[], userEmail: string) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "order",
          items: movies.map((movie, idx) => ({
            _key: `productId-${movie._id}`,
            movie: {
              _key: idx,
              _type: "reference",
              _ref: movie._id,
            },
            quantity: movie.quantity,
          })),
          userEmail,
          orderStatus: "pending",
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export async function fetchOrder(userEmail: string) {
  const query = `*[_type == "order" && userEmail == $userEmail] {
    _id,
    items[] {
      _key,
      quantity,
      movie -> {
        _id,
        name,
        price,
        images,
        slug {
          current
        },
        description
      }
    },
    orderStatus,
    createdAt
  }`;

  const params = { userEmail };
  const result: any = await sanityClient.fetch({ query, params });
  return result;
}
