import { parseCurrency } from "@/Utils/currency";

describe("Currency", () => {
  describe("parseCurrency", () => {
    test("should return the localized price", () => {
      const actual = 65;
      const expected = "$65.00";

      expect(parseCurrency(actual)).toEqual(expected);
    });
  });
});
