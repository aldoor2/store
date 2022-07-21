import { CartItem } from "@/Cart/types";
import { getCartItemPrice, getCartPrice } from "@/Cart/utils";

const item: CartItem = {
  id: "id",
  title: "title",
  description: "description",
  category: "category",
  image: "image",
  price: 100,
  quantity: 1,
};

describe("cart/utils.ts", () => {
  describe("getCartItemPrice", () => {
    describe("without options", () => {
      test("should return the correct price when there is one unit", () => {
        const actual: number = getCartItemPrice(item);
        const expected = 100;

        expect(actual).toEqual(expected);
      });

      test("should return the correct price when more than one unit is present", () => {
        const actual: number = getCartItemPrice({ ...item, quantity: 2 });
        const expected = 200;

        expect(actual).toEqual(expected);
      });
    });

    describe("with options", () => {
      test("should return the correct price when there is one unit", () => {
        const actual: number = getCartItemPrice({
          ...item,
          options: {
            Peso: [
              {
                category: "Peso",
                id: "",
                description: "",
                image: "",
                price: 50,
                title: "Medio kilo",
              },
            ],
          },
        });
        const expected = 150;

        expect(actual).toEqual(expected);
      });

      test("should return the correct price when more than one unit is present", () => {
        const actual: number = getCartItemPrice({
          ...item,
          options: {
            Peso: [
              {
                category: "Peso",
                id: "",
                description: "",
                image: "",
                price: 50,
                title: "Medio kilo",
              },
            ],
          },
          quantity: 2,
        });
        const expected = 300;

        expect(actual).toEqual(expected);
      });

      test("should return the correct price when there is one unit and more than one option", () => {
        const actual: number = getCartItemPrice({
          ...item,
          options: {
            Peso: [
              {
                category: "Peso",
                id: "",
                description: "",
                image: "",
                price: 50,
                title: "Medio kilo",
              },
            ],
            Calidad: [
              {
                category: "Calidad",
                id: "",
                description: "",
                image: "",
                price: 50,
                title: "Alta",
              },
            ],
          },
        });
        const expected = 200;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("getCartItem", () => {
    test("should return the correct price when there is one unit", () => {
      const actual: number = getCartPrice([item]);
      const expected = 100;

      expect(actual).toEqual(expected);
    });

    test("should return the correct price when more than one unit is present", () => {
      const actual: number = getCartPrice([item, item]);
      const expected = 200;

      expect(actual).toEqual(expected);
    });
  });
});
