/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import { jest } from "@jest/globals";

import CartDrawer from "@/Cart/components/CartDrawer/CartDrawer";
import { CartItem } from "@/Cart/types";
import * as cartContext from "@/Cart/context";

jest.mock("@/Cart/context");

const cartItem: CartItem = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
  quantity: 2,
};

describe("CartDrawer", () => {
  test("should show the quantity of products in an item in the detail", () => {
    const cart = new Map<CartItem["id"], CartItem>([[cartItem.id, cartItem]]);

    jest
      .spyOn<any, any>(cartContext, "useCart")
      .mockReturnValue([{ cart }, {}]);

    render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

    expect(screen.getByTestId("quantity")).toHaveTextContent(
      String(cartItem.quantity)
    );
  });

  test("should show the quantity of products in the detail", () => {
    const cart = new Map<CartItem["id"], CartItem>([[cartItem.id, cartItem]]);

    jest
      .spyOn<any, any>(cartContext, "useCart")
      .mockReturnValue([{ cart }, {}]);

    render(<CartDrawer isOpen fields={[]} onClose={jest.fn()} />);

    const item = screen.getByTestId(`cart-item-${cartItem.id}`);
    const quantityElement = within(item).getByTestId("quantity");
    const quantity = within(quantityElement).getByText(
      String(cartItem.quantity)
    );

    expect(quantity).toBeInTheDocument();
  });

  /*
  test("should show the number of products in the whatsapp message if there is more than one.", () => {
    render(
      <CartDrawer
        isOpen
        fields={[]}
        onClose={jest.fn()}
      />
    );

    const link = screen.getByTestId("complete-order");

    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(`(x${String(cartItem.quantity)})`)
    );
  });

  test("should not show the number of products in the whatsapp message if it is one.", () => {
    render(
      <CartDrawer
        isOpen
        items={[{ ...cartItem, quantity: 1 }]}
        onClose={jest.fn()}
      />
    );

    const link = screen.getByTestId("complete-order");

    expect(link.getAttribute("href")).not.toMatch(
      `(x${String(cartItem.quantity)})`
    );
  });

  test("should call to onDecrement when subtracting a product", () => {
    const onDecrement = jest.fn();

    render(
      <CartDrawer
        isOpen
        fields={[]}
        onClose={jest.fn()}
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
        fields={[]}
        onClose={jest.fn()}

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


      />
    );

    expect(
      screen.getByText("No hay elementos en tu carrito")
    ).toBeInTheDocument();
  }); */
});
