import * as React from "react";
import { Button, Divider, Stack, Text } from "@chakra-ui/react";

import { Cart, CartItem } from "@/Cart/types";
import { getCartItemOptionsSummary, getCartItemPrice } from "@/Cart/utils";
import { parseCurrency } from "@/Utils/currency";

interface Props {
  cart: Cart;
  onChange: (id: symbol, item: CartItem) => void;
}

const Details: React.FC<Props> = ({ cart, onChange }) => {
  return (
    <Stack divider={<Divider />} spacing={4}>
      {Array.from(cart.entries()).map(([id, item]) => (
        <Stack
          key={
            item.options
              ? `${id.toString()} con ${getCartItemOptionsSummary(
                  item.options
                )}`
              : id.toString()
          }
          data-testid={`cart-item-${item.id}`}
          direction="row"
        >
          <Stack width="100%">
            <Stack
              alignItems="flex-start"
              direction="row"
              justifyContent="space-between"
            >
              <Stack spacing={0}>
                <Text fontSize="lg" fontWeight="500">
                  {item.title}
                </Text>
                {Boolean(item.options) && (
                  <Text color="gray.500">
                    {getCartItemOptionsSummary(item.options)}
                  </Text>
                )}
              </Stack>
              <Text fontWeight="500">
                {parseCurrency(getCartItemPrice(item))}
              </Text>
            </Stack>
            <Stack direction="row">
              <Button
                borderRadius={9999}
                colorScheme="primary"
                data-testid="decrement"
                size="xs"
                onClick={() =>
                  onChange(id, { ...item, quantity: item.quantity - 1 })
                }
              >
                {" "}
                -{" "}
              </Button>
              <Text data-testid="quantity" fontWeight="500">
                {item.quantity}
              </Text>
              <Button
                borderRadius={9999}
                colorScheme="primary"
                data-testid="increment"
                size="xs"
                onClick={() =>
                  onChange(id, { ...item, quantity: item.quantity + 1 })
                }
              >
                {" "}
                +{" "}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Details;
