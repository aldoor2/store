import { Price } from "@/Product/types";

export const parseCurrency = ({
  price,
  locale = "en-US",
  currency = "USD",
}: Price): string =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(price);