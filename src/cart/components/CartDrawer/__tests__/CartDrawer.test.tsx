import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import CartDrawer from "@/Cart/components/CartDrawer/CartDrawer";
import { CartItem } from "@/Cart/types";

const product: CartItem = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
  quantity: 2,
};

describe("CartDrawer", () => {
  test("should show the quantity of products of an item", () => {
    render(
      <CartDrawer
        isOpen
        items={[product]}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={jest.fn()}
      />
    );

    expect(screen.getByTestId("quantity")).toHaveTextContent(
      String(product.quantity)
    );
  });

  test("should show the number of products in the whatsapp message if there is more than one.", () => {
    render(
      <CartDrawer
        isOpen
        items={[product]}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={jest.fn()}
      />
    );

    const link = screen.getByTestId("complete-order");

    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(`(x${String(product.quantity)})`)
    );
  });

  test("should not show the number of products in the whatsapp message if it is one.", () => {
    render(
      <CartDrawer
        isOpen
        items={[{ ...product, quantity: 1 }]}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={jest.fn()}
      />
    );

    const link = screen.getByTestId("complete-order");

    expect(link.getAttribute("href")).not.toMatch(
      `(x${String(product.quantity)})`
    );
  });

  test("should call to onDecrement when subtracting a product", () => {
    const onDecrement = jest.fn();

    render(
      <CartDrawer
        isOpen
        items={[product]}
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
        items={[product]}
        onClose={jest.fn()}
        onDecrement={jest.fn()}
        onIncrement={onIncrement}
      />
    );

    fireEvent.click(screen.getByTestId("increment"));

    expect(onIncrement).toHaveBeenCalled();
  });

  test("should show a message when the product is empty", () => {
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
