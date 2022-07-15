import * as React from "react";
import { GetStaticProps } from "next";

import { Product } from "@/Product/types";
import api from "@/Product/api";
import StoreScreen from "@/product/screen/store";

interface Props {
  products: Product[];
}

const IndexPage: React.FC<Props> = ({ products }) => {
  return <StoreScreen products={products} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  return {
    revalidate: 10,
    props: {
      products,
    },
  };
};

export default IndexPage;
