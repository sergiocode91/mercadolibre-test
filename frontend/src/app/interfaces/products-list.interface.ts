export interface ProductsListI {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  items: {
    id: string;
    title: string;
    price: {
      currency: number;
      amount: number;
      decimals: number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    location: {
      state: string;
      city: string;
    };
  }[];
}

export interface ProductsArticlesI {
  id: string;
  title: string;
  price: {
    currency: number;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  location: {
    state: string;
    city: string;
  };
}
