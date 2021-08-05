export interface ProductDescriptionI {
  author: {
    name: string;
    lastname: string;
  };
  categories: string[];
  item: {
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
    sold_quantity: number;
    description: string;
  };
}
