import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import ProductCard from "@/Product/components/ProductCard";
import { Product } from "@/Product/types";

const product: Product = {
  id: "id",
  image: "image",
  price: 100,
  title: "title",
  category: "category",
  description: "description",
};

describe("Product", () => {
  test("should show the title, price and button", () => {
    render(
      <ProductCard
        product={product}
        onAdd={jest.fn()}
        onSelectImage={jest.fn()}
      />
    );

    const priceRegex = new RegExp(String(product.price), "i");

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(priceRegex)).toBeInTheDocument();
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  test("should run onAdd when I click on Add", () => {
    // reference fuction onAdd
    const onAdd = jest.fn();

    // send by props
    render(
      <ProductCard product={product} onAdd={onAdd} onSelectImage={jest.fn()} />
    );

    // We clicked on button Agregar
    fireEvent.click(screen.getByText("Agregar"));

    // Verify clicked on button
    expect(onAdd).toHaveBeenCalled();
  });
});
