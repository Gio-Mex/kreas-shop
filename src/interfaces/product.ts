export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartProduct extends Product {
  cartQty: 0;
}
