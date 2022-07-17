import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CartDrawer from "@/Product/components/CartDrawer";
import { CartItem } from "@/Product/types";

const cart: CartItem[] = [
  {
    id: "id",
    image: "image",
    price: 100,
    title: "title",
    category: "category",
    description: "description",
    quantity: 1,
  },
];

describe("CartDrawer", () => {
  test("should call to onDecrement when subtracting a product", () => {
    const onDecrement = jest.fn();

    render(
      <CartDrawer
        isOpen
        items={cart}
        onClose={jest.fn()}
        onDecrement={onDecrement}
        onIncrement={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("decrement"));

    expect(onDecrement).toHaveBeenCalled();
  });

  test("should call to onIncrement when you increase a product", () => {
    const onIncrement = jest.fn();

    render(
      <CartDrawer
        isOpen
        items={cart}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={onIncrement}
      />
    );

    fireEvent.click(screen.getByTestId("increment"));

    expect(onIncrement).toHaveBeenCalled();
  });

  test("should show a message when the cart is empty", () => {
    render(
      <CartDrawer
        isOpen
        items={[]}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={jest.fn()}
      />
    );

    expect(
      screen.getByText("No hay elementos en tu carrito")
    ).toBeInTheDocument();
  });
});
