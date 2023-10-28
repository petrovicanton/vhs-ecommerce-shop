export interface Movie {
  _id: string;
  name: string;
  price: number;
  images: Array<{
    _key: string;
    url: string;
  }>;
  isFeatured: boolean;
  isTrending: boolean;
  category: {
    name: string;
    slug: { current: string };
  };
  slug: { current: string };
  quantity: number;
  description: string;
}

export type MovieSubset = Pick<
  Movie,
  "_id" | "name" | "price" | "quantity" | "images"
> & { maxQuantity: number };
