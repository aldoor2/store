import * as React from "react";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";

import { CartItem, Product } from "@/Product/types";
import { parseCurrency } from "@/utils/currency";

interface Props extends Omit<DrawerProps, "children"> {
  items: CartItem[];
  onIncrement: (product: Product) => void;
  onDecrement: (product: Product) => void;
}

const CartDrawer: React.FC<Props> = ({
  items,
  onIncrement,
  onDecrement,
  onClose,
  ...props
}) => {
  const total = React.useMemo(
    () =>
      parseCurrency({
        price: items.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        ),
      }),
    [items]
  );
  const text = React.useMemo(
    () =>
      items
        .reduce(
          (message, product) =>
            message.concat(
              `* ${product.title}${
                product.quantity > 1 ? ` (x${product.quantity})` : ""
              } - ${parseCurrency({
                price: product.price * product.quantity,
              })}\n`
            ),
          ``
        )
        .concat(`\nTotal: ${total}`),
    [items, total]
  );

  React.useEffect(() => {
    if (!items.length) onClose();
  }, [items.length, onClose]);

  return (
    <Drawer placement="right" size="sm" onClose={onClose} {...props}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Tu pedido</DrawerHeader>

          <DrawerBody>
            {items.length ? (
              <Stack divider={<Divider />} spacing={4}>
                {items.map((product) => (
                  <Stack key={product.id} direction="row">
                    <Stack width="100%">
                      <Stack direction="row" justifyContent="space-between">
                        <Text fontWeight={500}>{product.title}</Text>
                        <Text color="green.400">
                          {parseCurrency({
                            price: product.price * product.quantity,
                          })}
                        </Text>
                      </Stack>
                      <Stack direction="row">
                        <Button size="xs" onClick={() => onDecrement(product)}>
                          -
                        </Button>
                        <Text>{product.quantity}</Text>
                        <Button size="xs" onClick={() => onIncrement(product)}>
                          +
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Text color="gray.400" textAlign="center">
                No hay elementos en tu carrito
              </Text>
            )}
          </DrawerBody>

          {Boolean(items.length) && (
            <DrawerFooter paddingX={4}>
              <Link
                href={`https://wa.me/5491141414141?text=${encodeURIComponent(
                  text
                )}`}
                width="100%"
              >
                <Button
                  colorScheme="whatsapp"
                  leftIcon={
                    <Image
                      alt="icon"
                      src="https://icongr.am/fontawesome/whatsapp.svg?size=32&color=ffffff"
                    />
                  }
                  size="lg"
                  width="100%"
                >
                  Completar pedido ({total})
                </Button>
              </Link>
            </DrawerFooter>
          )}
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default CartDrawer;
