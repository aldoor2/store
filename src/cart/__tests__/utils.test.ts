import { CartItem, Field } from "@/Cart/types";
import {
  getCartItemOptionsSummary,
  getCartItemPrice,
  getCartMessage,
  getCartTotal,
} from "@/Cart/utils";

const cartItem: CartItem = {
  id: "id",
  title: "title",
  description: "description",
  category: "category",
  image: "image",
  price: 100,
  quantity: 1,
};

const field: Field = {
  note: "",
  options: ["Option 1"],
  required: true,
  title: "Field",
  type: "radio",
};

describe("cart/utils.ts", () => {
  describe("getCartItemPrice", () => {
    describe("without options", () => {
      test("should return the correct price when there is one unit", () => {
        const actual: number = getCartItemPrice(cartItem);
        const expected = 100;

        expect(actual).toEqual(expected);
      });

      test("should return the correct price when more than one unit is present", () => {
        const actual: number = getCartItemPrice({ ...cartItem, quantity: 2 });
        const expected = 200;

        expect(actual).toEqual(expected);
      });
    });

    describe("with options", () => {
      test("should return the correct price when there is one unit", () => {
        const actual: number = getCartItemPrice({
          ...cartItem,
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
          ...cartItem,
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
          ...cartItem,
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
      const cart = new Map<symbol, CartItem>([[Symbol(), cartItem]]);

      const actual: number = getCartTotal(cart);
      const expected = 100;

      expect(actual).toEqual(expected);
    });

    test("should return the correct price when more than one unit is present", () => {
      const cart = new Map<symbol, CartItem>([
        [Symbol(), cartItem],
        [Symbol(), cartItem],
      ]);

      const actual: number = getCartTotal(cart);
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
      const cart = new Map<symbol, CartItem>([[Symbol(), cartItem]]);
      const checkout = new Map<string, string>([["Forma de pago", "Efectivo"]]);

      const actual: string = getCartMessage(cart, checkout);
      const expected = `* title - $100.00

* Forma de pago: Efectivo

Total: $100.00`;

      expect(actual).toEqual(expected);
    });

    test("should show a message when there are options", () => {
      const cart = new Map<symbol, CartItem>([
        [
          Symbol(),
          {
            ...cartItem,
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
        ],
      ]);
      const checkout = new Map<string, string>([
        [field.title, field.options[0]],
      ]);

      const actual: string = getCartMessage(cart, checkout);
      const expected = `* title [Peso: Medio kilo, Calidad: Alta] - $200.00

* Field: Option 1

Total: $200.00`;

      expect(actual).toEqual(expected);
    });
  });
});
