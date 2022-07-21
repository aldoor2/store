export const parseCurrency = (price: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price
  );
