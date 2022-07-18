import axios from "axios";
import Papa from "papaparse";

import { Product } from "./types";

import { INFORMATION } from "@/App/constants";

const apiProducts = {
  list: async (): Promise<Product[]> => {
    return axios
      .get(INFORMATION.sheet, {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<Product[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const products = results.data as Product[];

                return resolve(
                  products.map((product) => ({
                    ...product,
                    price: Number(product.price),
                  }))
                );
              },
              error: (error) => reject(error.message),
            });
          })
      );
  },
  mock: {
    list: (mock: string): Promise<Product[]> =>
      import(`./mocks/${mock}.json`).then((result) => result.default),
  },
};

export default apiProducts;
