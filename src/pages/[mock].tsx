import { ParsedUrlQuery } from "querystring";

import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

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

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexPage: React.FC<Props> = ({ products, fields }) => {
  return (
    <CartProvider fields={fields}>
      <StoreScreen products={products} />
    </CartProvider>
  );
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({
  params,
}) => {
  const products = await productApi.mock.list(params.mock);
  const fields = await cartApi.mock.list(params.mock);

  return {
    revalidate: 10,
    props: {
      products,
      fields,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: process.env.NODE_ENV === "production" ? false : "blocking",
  };
};

export default IndexPage;
