import { ParsedUrlQuery } from "querystring";

import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import { Product } from "@/Product/types";
import api from "@/Product/api";
import StoreScreen from "@/Product/screen/Store";

interface Props {
  products: Product[];
}

interface Params extends ParsedUrlQuery {
  mock: string;
}

const IndexPage: React.FC<Props> = ({ products }) => {
  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps<unknown, Params> = async ({
  params,
}) => {
  const products = await api.mock.list(params.mock);

  return {
    revalidate: 10,
    props: {
      products,
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
