import axios from "axios";
import Papa from "papaparse";

import { INFORMATION } from "@/App/constants";
import { Option as IOption, Product as IProduct } from "@/Product/types";

interface RawOption extends IOption {
  type: "option";
}
interface RawProduct extends IProduct {
  type: "product";
}

class Product implements IProduct {
  id: IProduct["id"];
  title: IProduct["title"];
  description: IProduct["description"];
  category: IProduct["category"];
  image: IProduct["image"];
  options: IProduct["options"];
  price: IProduct["price"];

  constructor() {
    this.options = {} as Product["options"];
  }

  set(product: RawProduct) {
    Object.assign(this, product);
  }

  addOption(option: RawOption) {
    if (!this.options[option.category]) {
      this.options[option.category] = [];
    }

    this.options[option.category].push(option);
  }

  toJSON(): IProduct {
    const product = {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      image: this.image,
      options: this.options,
      price: this.price,
    };

    if (Object.keys(product.options).length === 0) {
      delete product.options;
    }

    return product;
  }
}

function normalize(data: (RawProduct | RawOption)[]) {
  const products = new Map<RawProduct["id"], Product>();

  for (const item of data) {
    if (!products.has(item.id)) {
      products.set(item.id, new Product());
    }

    if (item.type === "product") {
      const product = products.get(item.id);

      product.set({ ...item, price: Number(item.price) });
    } else if (item.type === "option") {
      const product = products.get(item.id);

      product.addOption({ ...item, price: Number(item.price) });
    }
  }

  const normalized: IProduct[] = Object.values(
    Object.fromEntries(products)
  ).map((product) => product.toJSON());

  return normalized;
}

const apiProducts = {
  list: async (): Promise<IProduct[]> => {
    return axios
      .get(INFORMATION.sheet, {
        responseType: "blob",
      })
      .then(
        (response) =>
          new Promise<IProduct[]>((resolve, reject) => {
            Papa.parse(response.data, {
              header: true,
              complete: (results) => {
                const data = normalize(
                  results.data as (RawProduct | RawOption)[]
                );

                return resolve(data);
              },
              error: (error) => reject(error.message),
            });
          })
      );
  },
  mock: {
    list: (mock: string): Promise<IProduct[]> =>
      import(`./mocks/${mock}.json`).then((result) =>
        normalize(result.default as (RawProduct | RawOption)[])
      ),
  },
};

export default apiProducts;
