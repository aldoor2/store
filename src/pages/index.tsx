import * as React from "react";
import { GetStaticProps } from "next";

import { Product } from "@/Product/types";
import productApi from "@/Product/api";
import cartApi from "@/Cart/api";
import StoreScreen from "@/Product/screen/store";
import { Field } from "@/Cart/types";
import CartProvider from "@/Cart/context";

interface Props {
  products: Product[];
  fields: Field[];
}

const IndexPage: React.FC<Props> = ({ products, fields }) => {
  return (
    <CartProvider fields={fields}>
      <StoreScreen fields={fields} products={products} />
    </CartProvider>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await productApi.list();
  const fields = await cartApi.list();

  return {
    props: {
      products,
      fields,
    },
  };
};

export default IndexPage;
