export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
}

export type Currency = "CLP" | "USD" | "JPY" | "COP";

export type Price = {
  price: number;
  locale?: string;
  currency?: Currency;
};
