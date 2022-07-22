import { CartItem } from "@/Cart/types";
import {
  getCartItemOptionsSummary,
  getCartItemPrice,
  getCartMessage,
  getCartTotal,
} from "@/Cart/utils";

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

  describe("getCartTotal", () => {
    test("should return the correct price when there is one unit", () => {
      const actual: number = getCartTotal([item]);
      const expected = 100;

      expect(actual).toEqual(expected);
    });

    test("should return the correct price when more than one unit is present", () => {
      const actual: number = getCartTotal([item, item]);
      const expected = 200;

      expect(actual).toEqual(expected);
    });
  });

  describe("getCartItemOptionsSummary", () => {
    test("should return the summary when we have an option", () => {
      const actual: string = getCartItemOptionsSummary({
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
      });
      const expected = "Peso: Medio kilo";

      expect(actual).toEqual(expected);
    });

    test("should return the summary when we have more than one option", () => {
      const actual: string = getCartItemOptionsSummary({
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
      });
      const expected = "Peso: Medio kilo, Calidad: Alta";

      expect(actual).toEqual(expected);
    });
  });

  describe("getCartMessage", () => {
    test("should show message when there are no options", () => {
      const actual: string = getCartMessage([item]);
      const expected = `* title - $100.00

Total: $100.00`;

      expect(actual).toEqual(expected);
    });

    test("should show a message when there are options", () => {
      const actual: string = getCartMessage([
        {
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
        },
      ]);
      const expected = `* title [Peso: Medio kilo, Calidad: Alta] - $200.00

Total: $200.00`;

      expect(actual).toEqual(expected);
    });
  });
});
