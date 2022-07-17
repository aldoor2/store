import { CartItem, Product } from "@/Product/types";
import { editCart } from "@/Product/selectors";

describe("editCart", () => {
  const product: Product = {
    id: "id",
    category: "category",
    title: "title",
    description: "description",
    image: "image",
    price: 10,
  };

  it("should reduce the quantity of a product by one", () => {
    const actual: CartItem[] = [{ ...product, quantity: 5 }];
    const expected: CartItem[] = [{ ...product, quantity: 4 }];

    expect(editCart(product, "decrement")(actual)).toMatchObject(expected);
  });
  it("should increase the quantity of one product in one product.", () => {
    const actual: CartItem[] = [{ ...product, quantity: 5 }];
    const expected: CartItem[] = [{ ...product, quantity: 6 }];

    expect(editCart(product, "increment")(actual)).toMatchObject(expected);
  });
  it("should delete a product, if we reduce by one and the quantity was one", () => {
    const actual: CartItem[] = [{ ...product, quantity: 1 }];
    const expected: CartItem[] = [];

    expect(editCart(product, "decrement")(actual)).toMatchObject(expected);
  });
});
