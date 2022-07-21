import { Product } from "@/Product/types";

export interface CartItem extends Product {
  quantity: number;
}
